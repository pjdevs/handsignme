module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    transform: {
        '^.+\\.vue$': 'vue-jest'
    },
    collectCoverage: true,
    coverageReporters: [
        'lcov',
        'text'
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/test/'
    ],
    testMatch: [
        '**/tests/**/*.(spec|test).js'
    ]
}
