import * as Buffer from "buffer";

export interface FileModel {
  id: number;
  name: string
  data: any; // Buffer actually
  mimeType:string
  coordinator: Coordinator;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailEndpointResponse {
  emailPreview: EmailPreview[];
  successfulEmails: SuccessfulEmail[];
}

export interface SuccessfulEmail {
  email: string;
  success: boolean;
}

export interface EmailPreview {
  from: string;
  to: string;
  subject: string;
  html: string;
  attachments: string[];
  cc: string[],
}

export interface AllowedStudent {
  id: number;
  fullName: string;
  identifier: string;
  founding: string;
  coordinator: string;

  createdAt: Date;
  updatedAt: Date;
  loading: boolean;
}

export interface Coordinator {
  id: number;

  name: string;
  function: string;
  email: string;
  password: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: number;

  identifier: string;
  fullName: string;
  email: string;
  alternativeEmail: string;
  attendanceYear: number;
  coordinatorName: string;
  coordinatorFunction: string;
  report: string;
  reportUpdate: Date;

  createdAt: Date;
  updatedAt: Date;

  loading: boolean;
}

export interface EmailResponse {
  email: string;
  success: boolean;
}
