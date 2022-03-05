import nodemailer from 'nodemailer';
import {UtilService} from "./util.service";
import {Attachment} from "nodemailer/lib/mailer";
require('dotenv').config();

const env =  process.env as any;

export class MailService {

    static async sendMail(options: MailOptions) {
        const transporter = nodemailer.createTransport({
            host: env.SMTP_HOST,
            port: env.SMTP_PORT,
            secure: env.SMTP_SECURE,
            auth: {
                user: env.SMTP_USER,
                pass: env.SMTP_PASS,
            },
        });

        const info = await transporter.sendMail(options);

        console.log(`Mail send to: ${options.to}`);
        console.log(info.messageId);

        return info;
    }

}

export class MailOptions {
    from: string;
    to: string;
    cc: string;
    bcc: string;
    subject: string;
    text: string;
    html: string;
    attachments: Attachment[];

    constructor(from: string, to: string[], cc: string[], bcc: string[],
                subject: string, text: string, html: string, htmlParams: any[],
                attachments: Attachment[] = []) {

        this.from = from;
        this.to = UtilService.arrayToString(to, ',');
        this.cc = UtilService.arrayToString(cc, ',');
        this.bcc = UtilService.arrayToString(bcc, ',');
        this.subject = subject;
        this.html = UtilService.stringFormat(html, htmlParams);
        this.text = this.html;
        this.attachments = attachments;
    }

}

export enum EmailTemplates {
    LOGIN = `Hello! In oder to log in paste this code into the app {0}`,
}

export enum EmailDefaults {
    FROM = 'adriana.bejinariu@info.uaic.ro',
    PARTIAL_SUBJECT = 'Școala Doctorală de Informatică',
}