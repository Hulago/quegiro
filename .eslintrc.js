require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    legacyDecorators: true,
    experimentalDecorators: true
  },
  rules: {
    'vue/multi-word-component-names': 'off'
  },
  root: true
};
