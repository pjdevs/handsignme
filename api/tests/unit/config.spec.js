const config = require('../../src/utils/config')

describe('Config Utils', () => {
    describe('Validate Configuration', () => {
        it('Configuration is not an array', async () => {
            let conf = '{"email":"foo1@bar.com","signature":{"rect":{"x":0.65,"y":0.85,"width":0.3,"height":0.1,"color":"purple"},"color":"black"},"page":1}'
            expect(() => {
                config.validateConfiguration(JSON.parse(conf))
            }).toThrow('Configuration must be an array')
        })
        it('Email missing', async () => {
            let conf = '[{"signature":{"rect":{"x":0.65,"y":0.85,"width":0.3,"height":0.1,"color":"purple"},"color":"black"},"page":1}]'
            expect(() => {
                config.validateConfiguration(JSON.parse(conf))
            }).toThrow('[Configuration] : Email missing')
        })
        it('X from the rectangle missing', async () => {
            let conf = '[{"email":"foo1@bar.com","signature":{"rect":{"y":0.85,"width":0.3,"height":0.1,"color":"purple"},"color":"black"},"page":1}]'
            expect(() => {
                config.validateConfiguration(JSON.parse(conf))
            }).toThrow('[Configuration] : X from the rectangle missing')
        })
        it('Y from the rectangle missing', async () => {
            let conf = '[{"email":"foo1@bar.com","signature":{"rect":{"x":0.65, "width":0.3,"height":0.1,"color":"purple"},"color":"black"},"page":1}]'
            expect(() => {
                config.validateConfiguration(JSON.parse(conf))
            }).toThrow('[Configuration] : Y from the rectangle missing')
        })
        it('Width from the rectangle missing', async () => {
            let conf = '[{"email":"foo1@bar.com","signature":{"rect":{"x":0.65,"y":0.85,"height":0.1,"color":"purple"},"color":"black"},"page":1}]'
            expect(() => {
                config.validateConfiguration(JSON.parse(conf))
            }).toThrow('[Configuration] : Width from the rectangle missing')
        })
        it('Height from the rectangle missing', async () => {
            let conf = '[{"email":"foo1@bar.com","signature":{"rect":{"x":0.65,"y":0.85,"width":0.3,"color":"purple"},"color":"black"},"page":1}]'
            expect(() => {
                config.validateConfiguration(JSON.parse(conf))
            }).toThrow('[Configuration] : Height from the rectangle missing')
        })
        it('Color from the rectangle missing', async () => {
            let conf = '[{"email":"foo1@bar.com","signature":{"rect":{"x":0.65,"y":0.85,"width":0.3,"height":0.1},"color":"black"},"page":1}]'
            expect(() => {
                config.validateConfiguration(JSON.parse(conf))
            }).toThrow('[Configuration] : Color from the rectangle missing')
        })
        it('Color from the signatory missing', async () => {
            let conf = '[{"email":"foo1@bar.com","signature":{"rect":{"x":0.65,"y":0.85,"width":0.3,"height":0.1,"color":"purple"}},"page":1}]'
            expect(() => {
                config.validateConfiguration(JSON.parse(conf))
            }).toThrow('[Configuration] : Color from the signatory missing')
        })
        it('Page number missing', async () => {
            let conf = '[{"email":"foo1@bar.com","signature":{"rect":{"x":0.65,"y":0.85,"width":0.3,"height":0.1,"color":"purple"},"color":"black"}}]'
            expect(() => {
                config.validateConfiguration(JSON.parse(conf))
            }).toThrow('[Configuration] : Page number missing')
        })
        it('Page number missing', async () => {
            let conf = '[{"email":"foo1@bar.com","signature":{"rect":{"x":0.65,"y":0.85,"width":0.3,"height":0.1,"color":"purple"},"color":"black"}, "page":1}]'
            expect(() => {
                config.validateConfiguration(JSON.parse(conf))
            }).not.toThrowError()
        })
    })
})