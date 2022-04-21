const db = require('../models')

function validateEmail(req, res, next) {
    const signatory = db.Signatory.findOne({
        where: {
            email: req.body.email
        }
    })

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