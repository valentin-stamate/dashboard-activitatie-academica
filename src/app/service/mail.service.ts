import nodemailer from 'nodemailer';
import {Env} from "../../../env";
import {strict} from "assert";
import {UtilService} from "./util.service";

export class MailService {

    async sendMail(options: MailOptions) {
        const transporter = nodemailer.createTransport({
            host: Env.SMTP_HOST,
            port: Env.SMTP_PORT,
            secure: Env.SMTP_SECURE,
            auth: {
                user: Env.SMTP_USER,
                pass: Env.SMTP_PASS,
            }
        });

        const info = await transporter.sendMail(options);

        console.log("Email send: %s", info.messageId);
    }

}

abstract class MailOptions {
    from: string;
    to: string[];
    cc: string[] | undefined;
    bcc: string[] | undefined;
    subject: string;
    text: string;
    html: string;
    // attachments: any;

    protected constructor(from: string, to: string[], cc: string[], bcc: string[], subject: string, text: string, html: string) {
        this.from = from;
        this.to = [];
        this.cc = undefined;
        this.bcc = undefined;
        this.subject = subject;
        this.text = text;
        this.html = html;

        for (const e of to) {
            this.to.push(e + ',');
        }

        if (cc.length !== 0) {
            this.cc = [];

            for (const e of cc) {
                this.cc.push(e, ',');
            }
        }

        if (bcc.length !== 0) {
            this.bcc = [];

            for (const e of bcc) {
                this.bcc.push(e, ',');
            }
        }


    }

}

export class ActivationMail extends MailOptions {
    constructor(to: string[], cc: string[], bcc: string[], props: {identity: string, activationKey: string}) {
        const from = 'Doctoral School';
        const subject = 'Email Activation';
        const text = 'In order to activate your email press on the following link...';
        const html = `
            Your identity: <b>{0}</b><br>
            In order to activate your email press on the following link: 
            <a href="${Env.SERVER_URL}/activate?key={1}" target="_blank">activate account</a>`;

        const parsedHtml = UtilService.stringFormat(html, [props.identity, props.activationKey]);

        super(from, to, cc, bcc, subject, text, parsedHtml);
    }
}

export class AuthenticationMail extends MailOptions {
    constructor(to: string[], cc: string[], bcc: string[], props: {identity: string, authKey: string}) {
        const from = 'Doctoral School';
        const subject = 'Log in';
        const text = 'Welcome {0}. In order to log in copy the following code...';
        const html = `
            Welcome: <b>{0}</b><br>
            In order to log in copy the following code: 
            <b>{1}</b>`;

        const parsedText = UtilService.stringFormat(text, [props.identity]);
        const parsedHtml = UtilService.stringFormat(html, [props.identity, props.authKey]);

        super(from, to, cc, bcc, subject, parsedText, parsedHtml);
    }
}