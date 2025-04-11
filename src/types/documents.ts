
export type DocumentType = "PDF" | "IMAGE" | "DOC" | "SPREADSHEET";

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  category: string;
  size: string;
  date: string;
}
