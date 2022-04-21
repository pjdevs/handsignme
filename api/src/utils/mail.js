const nodemailer = require('nodemailer')
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/nodemailer.json')[env]

const transporter = nodemailer.createTransport(config)

function nameFromMail(email) {
    return email.split('@')[0].split('.').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ')
}

async function sendInvitationMail(sender, signatories, document, configuration, link) {
    const senderName = nameFromMail(sender.email)
    const mails = []

    for (const signatory of signatories) {
        const others = signatories.filter(other => other !== signatory).map(other => other.email).join(', ')

        transporter.sendMail({
            from: '"HandSignMe" <noreply@handsignme.com>',
            to: signatory.email,
            subject: '[HandSignMe] Document signing invitation',
            text: `Hi there,\n\n${senderName} <${sender.email}> invited you, and ${others}, to sign this document :\n\n${document.name}\n\n${configuration.description || 'No description'}\n\nFollow this link to sign it here ${link}/${signatory.token} or ignore this mail.\n\nHandSignMe`,
            html: `Hi there,<br/><br/><a href="mailto:${sender.email}">${senderName}</a> invited you, and ${others}, to sign this document :<br/><br/><b>${document.name}</b><br/><br/><em>${configuration.description || 'No description'}</em><br/><br/>Follow this link to sign it <a href="=${link}/${signatory.token}">here</a> or ignore this mail.<br/><br/>HandSignMe`
        })
    }

    return Promise.all(mails)
}

module.exports = {
    sendInvitationMail: sendInvitationMail,
    nameFromMail: nameFromMail
}