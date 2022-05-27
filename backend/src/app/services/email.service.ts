import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

require('dotenv').config();

const env =  process.env as any;

export class MailService {

    static async sendMail(options: Mail.Options) {
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

        console.log(`Mail send to: ${options.to}, from ${options.from}`);
        console.log(info.messageId);

        return info;
    }

}

export class LoginMessage {
    static subject = '[Login] Școala Doctorală FII';

    static getHtml(code: string) {
        return `Hello! In order to log in paste this code into the app <b>${code}</b> .`;
    }
}

export class SignupMessage {
    static subject = '[Signup] Școala Doctorală FII';

    static getHtml(firstname: string) {
        return `Hello: ${firstname}! Welcome!`;
    }
}

export class AdminLoginMessage {
    static subject = '[Login] Școala Doctorală FII';

    static getHtml(code: string) {
        return `Hello! In order to log in paste this code into the app <b>${code}</b> .`;
    }
}

export enum EmailDefaults {
    FROM = 'Școala Doctorală FII <adriana.bejinariu@info.uaic.ro>',
    APP_NAME = 'Școala Doctorală de Informatică',
}