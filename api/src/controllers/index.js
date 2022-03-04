module.exports = (db, config) => {
    return {
        pdf: require('./pdf')(db, config)
    }
}