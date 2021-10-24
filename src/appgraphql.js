const {buildSchema} = require('graphql')
const {MailInfo, sendMail} = require("./functions/mail/mail");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    mail: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
    mail: async () => {
        let message = 'Message sent';

        const html = `<b>Lorem ipsum dolor sit amet.</b>`;

        const mailInfo = new MailInfo(
            [''],
            '',
            '',
            html
        );

        await sendMail(mailInfo).catch((e) => {
            console.log(e);
            message = 'Error sending message';
        });

        return message;
    },
};

module.exports = {
    schema: schema,
    root: root
};