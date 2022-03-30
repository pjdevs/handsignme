const nodemailer = require('nodemailer')
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/nodemailer.json')[env]

const transporter = nodemailer.createTransport(config)

async function sendInvitationMail(sender, signatories, document, configuration, link) {
    const senderName = sender.email.split('@')[0]

    return transporter.sendMail({
        from: '"HandSignMe" <noreply@handsignme.com>',
        to: signatories.map(signatory => signatory.email).join(', '),
        subject: '[HandSignMe] Document signing invitation',
        text: `Hi there,\n\n${senderName} <${sender.email}> invited you to sign this document :\n\n${document.name}\n\n${configuration.description}\n\nFollow this link to sign it here ${link} or ignore this mail.\n\nHandSignMe`,
        html: `Hi there,<br/><br/> <a href="mailto:${sender.email}">${senderName}</a> invited you to sign this document :<br/><br/><b>${document.name}</b><br/><br/><em>${configuration.description}</em><br/><br/>Follow this link to sign it <a href="=${link}">here</a> or ignore this mail.<br/><br/>HandSignMe`
    })
}

module.exports = {
    sendInvitationMail: sendInvitationMail
}