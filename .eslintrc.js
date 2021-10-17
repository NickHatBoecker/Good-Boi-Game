module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'standard',
    ],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['error', 4],
        'comma-dangle': ['error', 'always-multiline'],
        'no-new': 0,
    },
}
