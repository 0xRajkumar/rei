module.exports = {
    env: {
        browser: false,
        es2021: true,
        mocha: true,
        node: true
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'standard',
        'plugin:prettier/recommended',
        'plugin:node/recommended',
        'plugin:prettier/@typescript-eslint'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12
    },
    rules: {
        'node/no-unsupported-features/es-syntax': [
            'error',
            { ignores: ['modules'] }
        ],
        camelcase: 'off',
        'node/no-missing-import': 'off'
    }
};
