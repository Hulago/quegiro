/* eslint-disable @typescript-eslint/no-var-requires */
const eslint = require('eslint');
const { resolve } = require('path');

const { ESLint } = eslint;

const cli = new ESLint({
  cwd: resolve(__dirname),
  fix: true,
  overrideConfigFile: '../index.js',
  useEslintrc: false
});

module.exports = {
  cli
};