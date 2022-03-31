module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }

    next(new Error('You have to be logged in to access the page.'))
    res.redirect('/')
}
