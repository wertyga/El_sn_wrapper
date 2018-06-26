import nodemailer from 'nodemailer';

import emailConfig from '../emailConfig';

const log = require('../log')(module);

function sendEmail(msg) {
    const transport = nodemailer.createTransport(emailConfig);
    const mailMessage = {
        from: 'Crypto_signer',
        to: emailConfig.auth.user,
        subject: 'Request from "Crypto_Signer"',
        html: `<div>E-mail: ${msg.email}</div><div>Message: ${msg.message}</div>`
    };

    transport.sendMail(mailMessage, (err) => {
        if(err) {
            console.error(err);
            log.error(err);
            setTimeout(() => sendEmail(msg), 10000);
        } else {
            log.info(`email: ${msg.email}; message: ${msg.message}`)
        }
    })
};

export default sendEmail;