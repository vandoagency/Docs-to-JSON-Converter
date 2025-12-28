
export interface ConvertedData {
  id: string;
  creatorId: string; // Unique Browser/Device ID
  fileName: string;
  fileType: string;
  data: any;
  timestamp: string;
}

export enum DocSource {
  LOCAL = 'LOCAL',
  GOOGLE = 'GOOGLE'
}

export interface GoogleCredentials {
  clientId: string;
  apiKey: string;
}

export type Language = 'tr' | 'en';

// Global declaration for Google APIs loaded via script tags
declare global {
  interface Window {
    google: any;
    gapi: any;
  }
}
