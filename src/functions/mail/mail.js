const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");

const smtp = {
    host: dotenv.parsed.SMTP_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: dotenv.parsed.SMTP_USER,
        pass: dotenv.parsed.SMTP_PASS
    },
};

class MailInfo {
    constructor(to, from, subject, html) {
        this.to = '';

        for (const receiver of to) {
            this.to += `${receiver},`;
        }
        this.from = from;
        this.subject = subject;
        this.html = html;
    }
}

async function sendMail(mailInfo) {
    console.log(`Sending mail to ${mailInfo.to}`);

    let transporter = nodemailer.createTransport(smtp);

    let info = await transporter.sendMail({
        from: mailInfo.from,
        to: mailInfo.to,
        subject: mailInfo.subject,
        html: mailInfo.html,
    });

    console.log(`Mail sent: ${info.messageId}`);
}

module.exports = {
    sendMail: sendMail,
    MailInfo: MailInfo
};