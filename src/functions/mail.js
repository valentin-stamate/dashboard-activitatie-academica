const colors = require("colors");

const dotenv = require("dotenv").config();

const SMTP_USER = dotenv.parsed.SMTP_USER;
const SMTP_KEY = dotenv.parsed.SMTP_KEY;

const nodemailer = require("nodemailer");

async function sendMail(recipientList) {

    console.log(`Sending mail to ${recipientList}`.yellow.bold);

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: SMTP_USER,
            pass: SMTP_KEY,
        },
    });

    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: recipientList, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log(`Mail sent: ${info.messageId}`.green.bold);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = sendMail;