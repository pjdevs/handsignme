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
        ],
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1,
                maxBOF: 0,
                maxEOF: 1
            }
        ],
        'key-spacing': [
            'error',
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        'curly': [
            'error',
            'all'
        ],
        'brace-style': [
            2,
            '1tbs',
            {
                'allowSingleLine': false
            }
        ],
        'no-trailing-spaces': [
            'error'
        ],
        'space-before-blocks': [
            'error',
            'always'
        ],
        'arrow-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        'no-multi-spaces': 'error',
        'block-spacing': [
            'error',
            'always'
        ],
        'space-before-function-paren': 0,
        eqeqeq: [
            'error',
            'always'
        ],
        'space-infix-ops': [
            'error',
            { 'int32Hint': false }
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
