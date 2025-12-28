
interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  captchaToken?: string | null;
}

/**
 * TEKNİK BİLGİLENDİRME:
 * Web tarayıcıları doğrudan SMTP bağlantısı yapamaz.
 * Maillerin ulaşması için "FormSubmit" servisi kullanılmıştır.
 */

export const sendContactEmail = async (data: ContactFormData): Promise<boolean> => {
  // Form verilerini hazırlıyoruz
  const formData = new FormData();
  formData.append('name', data.fullName);
  formData.append('email', data.email); // Reply-To olarak kullanılır
  formData.append('phone', data.phone || 'Belirtilmedi');
  formData.append('_subject', `[Vando Docs Contact] ${data.subject}`);
  formData.append('message', data.message);
  
  // FormSubmit'in kendi captcha sayfasını kapatıyoruz çünkü frontend tarafında
  // Google ReCAPTCHA ile kullanıcı doğrulamasını zaten yaptık (UI Block).
  formData.append('_captcha', 'false'); 
  formData.append('_template', 'table');

  try {
    // FormSubmit endpoint'ine POST isteği (Backend olmadan mail gönderimi)
    // ozgur@ozgurcelebi.com adresine gönderilir.
    const response = await fetch("https://formsubmit.co/ozgur@ozgurcelebi.com", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      console.log("✅ Email sent successfully via Relay");
      return true;
    } else {
      throw new Error("Mail gönderim hatası");
    }
  } catch (error) {
    console.error("Mail Error:", error);
    throw error;
  }
};
