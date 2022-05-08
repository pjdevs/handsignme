function validateConfiguration(configuration) {
    if (!configuration) {
        throw new Error('A configuration must be mentionned')
    }
    if (!(configuration instanceof Array)) {
        throw new Error('Configuration must be an array')
    }
    for (const conf of configuration) {
        if (!conf.email) {
            throw new Error('[Configuration] : Email missing')
        }
        if (!conf.signature.rect.x) {
            throw new Error('[Configuration] : X from the rectangle missing')
        }
        if (!conf.signature.rect.y) {
            throw new Error('[Configuration] : Y from the rectangle missing')
        }
        if (!conf.signature.rect.width) {
            throw new Error('[Configuration] : Width from the rectangle missing')
        }
        if (!conf.signature.rect.height) {
            throw new Error('[Configuration] : Height from the rectangle missing')
        }
        if (!conf.signature.rect.color) {
            throw new Error('[Configuration] : Color from the rectangle missing')
        }
        if (!conf.signature.color) {
            throw new Error('[Configuration] : Color from the signatory missing')
        }
        if (!conf.page) {
            throw new Error('[Configuration] : Page number missing')
        }
    }
}
module.exports = {
    validateConfiguration
}
