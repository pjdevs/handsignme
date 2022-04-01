module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }

    const err = new Error('You have to be logged in to access this.')
    err.status = 401

    return next(err)
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
        return next()
    }

    const err = new Error('You do not have sufficent rights to access this.')
    err.status = 401

    return next(err)
}
