const db = require('../models')

async function validateEmail(req, res, next) {
    const signatory = await db.Signatory.findOne({
        where: {
            email: req.body.email
        }
    })
    if (!signatory) {
        return next(new Error ('No email found'))
    }
    if (signatory.id === req.signatory.id) {
        res.send({ msg: 'ok' })
    } else {
        const err = new Error('Wrong email')
        err.status = 401
        next(err)
    }
}

module.exports = {
    validateEmail
}