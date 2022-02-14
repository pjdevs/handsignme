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
