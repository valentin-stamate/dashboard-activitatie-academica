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
    cc: string[];
}