module.exports = {
    testEnvironment: 'node',
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
    ],
    collectCoverageFrom: [
        'src/controllers/**/*.js'
    ]
}