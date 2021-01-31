module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-undef': 'off',
    'func-names': 'off',
    'new-cap': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'warn',
    'no-restricted-syntax': 'off',
    'linebreak-style': 'off',
    'global-require': 0,
    'no-plusplus': 'off',
    'import/prefer-default-export': 'off',
  },
};
