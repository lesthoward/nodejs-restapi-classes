const nodemailer = require('nodemailer')
const path = require('path')

const pug = require('pug')
const juice = require('juice')

const transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    auth: {
        user: '24a9f2e1b6b5fadbf685e2afb08eca81',
        pass: '1c43c93b2ca47b0289e2a2499288b671'
    }
})

// const transporter = nodemailer.createTransport({
//     host: 'smtp.elasticemail.com',
//     port: 2525,
//     auth: {
//         user: 'no-reply@tengounaidea.xyz',
//         pass: '65F5957AD86835B4AF2DA1B89FA174BFB7F0'
//     }
// })

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'lesthoward@gmail.com',
//         pass: '!?hL.nt@gNrL.zfrt*'
//     }
// })

const HtmlEmailTemplate = (tokenURL, filename) => {
    const emailTemplate = pug.renderFile(path.join(__dirname, `../views/emails/${filename}.pug`), { tokenURL })
    return juice(emailTemplate)
}

const SendEmail = async (subject, pugTemplate, to) => {
    await transporter.sendMail({
        from: 'Tengo Una Idea <no-reply@tengounaidea.xyz>',
        to,
        subject,
        text: '',
        html: pugTemplate
    })
}
module.exports = {
    HtmlEmailTemplate,
    SendEmail
}