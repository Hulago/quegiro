module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['@quegiro/eslint-config'],
  parserOptions: {
    ecmaVersion: 2020
  },
  root: true,
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    'comma-dangle': ['error', 'never'],
    'comma-spacing': [1, { after: true, before: false }],
    'vue/no-v-html': 'off'
  }
};
