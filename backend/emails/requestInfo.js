const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.MAIL_API_KEY)

const sendEmail = email => {
    const msg = {
        to: email,
        from: 'jacquelineturof@gmail.com',
        subject: 'North Star Information Request',
        html: `<p>You requested additional information!<p>
               <p>Here you go.<p>`
    }
    
    sgMail.send(msg)
}

module.exports = { sendEmail }