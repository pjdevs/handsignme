module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }

    const err = new Error('You have to be logged in to access the page.')
    err.status = 401

    return next(err)
}
