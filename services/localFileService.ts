import * as XLSX from 'xlsx';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import { Language } from '../types';

// Configure PDF.js worker
const pdfjs = (pdfjsLib as any).GlobalWorkerOptions ? pdfjsLib : (pdfjsLib as any).default;

if (pdfjs && pdfjs.GlobalWorkerOptions) {
  pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
}

const getErrorMsg = (key: string, lang: Language): string => {
  const errors: {[k: string]: {tr: string, en: string}} = {
    errExcel: { tr: "Excel/CSV dosyası okunamadı.", en: "Excel/CSV file could not be read." },
    errTxt: { tr: "Metin dosyası okunamadı.", en: "Text file could not be read." },
    errDocx: { tr: "Word dosyası okunamadı.", en: "Word file could not be read." },
    errJson: { tr: "Geçersiz JSON dosyası.", en: "Invalid JSON file." },
    errPdf: { tr: "PDF dosyası okunamadı.", en: "PDF file could not be read." },
    errPdfLib: { tr: "PDF kütüphanesi yüklenemedi.", en: "PDF library could not be loaded." },
    errFormat: { tr: "Desteklenmeyen dosya formatı.", en: "Unsupported file format." },
  };
  return errors[key] ? errors[key][lang] : (lang === 'en' ? "Unknown error" : "Bilinmeyen hata");
};

const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) resolve(e.target.result as ArrayBuffer);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) resolve(e.target.result as string);
    };
    reader.onerror = reject;
    reader.readAsText(file, 'UTF-8');
  });
};

export const parseLocalFile = async (file: File, lang: Language = 'tr'): Promise<any> => {
  const extension = file.name.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'xlsx':
    case 'xls':
    case 'csv':
      try {
        const data = await readFileAsArrayBuffer(file);
        const workbook = XLSX.read(data, { type: 'array', codepage: 65001 });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json(sheet, { defval: "" });
      } catch (error) {
        console.error(error);
        throw new Error(getErrorMsg('errExcel', lang));
      }

    case 'txt':
      try {
        const text = await readFileAsText(file);
        return {
          content: text,
          lines: text.split('\n').map(line => line.trim()).filter(Boolean)
        };
      } catch (error) {
        throw new Error(getErrorMsg('errTxt', lang));
      }

    case 'docx':
    case 'doc':
      try {
        const arrayBuffer = await readFileAsArrayBuffer(file);
        const result = await mammoth.extractRawText({ arrayBuffer });
        return {
          fullText: result.value,
          messages: result.messages,
          paragraphs: result.value.split('\n').filter(p => p.trim().length > 0)
        };
      } catch (error) {
        throw new Error(getErrorMsg('errDocx', lang));
      }
      
    case 'json':
      try {
        const jsonText = await readFileAsText(file);
        return JSON.parse(jsonText);
      } catch (error) {
        throw new Error(getErrorMsg('errJson', lang));
      }

    case 'pdf':
      try {
        if (!pdfjs) throw new Error(getErrorMsg('errPdfLib', lang));
        
        const arrayBuffer = await readFileAsArrayBuffer(file);
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        const pages = [];
        let fullText = "";

        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          
          const pageText = textContent.items
            .map((item: any) => item.str || '')
            .join(' ');
          
          pages.push({
            pageNumber: i,
            content: pageText
          });
          fullText += pageText + "\n\n";
        }

        let metadata = {};
        try {
            metadata = await pdf.getMetadata();
        } catch (e) {
            console.warn("PDF metadata could not be extracted", e);
        }

        return {
          metadata: metadata,
          pageCount: numPages,
          fullText: fullText.trim(),
          pages: pages
        };
      } catch (error: any) {
        console.error(error);
        throw new Error(`${getErrorMsg('errPdf', lang)}: ${error.message}`);
      }

    default:
      throw new Error(getErrorMsg('errFormat', lang));
  }
};