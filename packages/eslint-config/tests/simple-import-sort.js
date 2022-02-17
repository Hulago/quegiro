/* eslint-disable @typescript-eslint/no-var-requires */
const test = require('tape');
const eslint = require('eslint');
const { resolve } = require('path');

test('> Should fail with simple-import-sort/sort', async (assert) => {
  assert.plan(2);

  const { ESLint } = eslint;

  const cli = new ESLint({
    cwd: resolve(__dirname),
    fix: false,
    overrideConfigFile: '../index.js',
    useEslintrc: false
  });

  // eslint-disable-next-line @typescript-eslint/indent
  const code = `
import './setup';
import 'some-polyfill';
import './global.css';
import type Amazing from 'an-npm-package';

const hello: Amazing = 'world';
hello.toString();
  `;

  const [{ errorCount, messages }] = await cli.lintText(code);
  const [ { ruleId } ] = messages;

  assert.equal(errorCount, 1);
  assert.equal(ruleId, 'simple-import-sort/sort');
  assert.end();
});

test('> Should fix simple-import-sort/sort', async (assert) => {
  assert.plan(1);

  const { ESLint } = eslint;

  const cli = new ESLint({
    cwd: resolve(__dirname),
    fix: true,
    overrideConfigFile: '../index.js',
    useEslintrc: false
  });

  // eslint-disable-next-line @typescript-eslint/indent
  const code = `
import './setup';
import 'some-polyfill';
import './global.css';
import type Amazing from 'an-npm-package';

const hello: Amazing = 'world';
hello.toString();
  `;

  const [{ errorCount }] = await cli.lintText(code);

  assert.equal(errorCount, 0);
  assert.end();
});