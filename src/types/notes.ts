
export type NoteStatus = 'active' | 'completed' | 'archived';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
  tags: string[];
  followUp: string | null;
  status: NoteStatus;
  attachments?: NoteAttachment[];
  patientId?: string;
  subjective?: string;
  objective?: string;
  assessment?: string;
  plan?: string;
}

export interface NoteAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  uploadedAt: string;
  uploadedBy: string;
}
