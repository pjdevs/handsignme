module.exports = {
    root: true,
    plugins: [
        'jest'
    ],
    env: {
        node: true,
        browser: false,
        commonjs: false,
        es2021: true
    },
    extends: [
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 13
    },
    rules: {
        indent: [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'never'
        ],
        'comma-spacing': [
            'error',
            {
                before: false,
                after: true
            }
        ],
        'object-curly-spacing': [
            'error',
            'always'
        ],
        'array-bracket-spacing': [
            'error',
            'never'
        ],
        'comma-dangle': [
            'error',
            'never'
        ],
        'space-in-parens': [
            'error',
            'never'
        ]
    },
    overrides: [
        {
            files: [
                '**/tests/**/*.spec.js'
            ],
            env: {
                jest: true
            }
        }
    ],
    ignorePatterns: [
    ]
}
