/* eslint-disable @typescript-eslint/no-var-requires */
const test = require('tape');
const eslint = require('eslint');
const { resolve } = require('path');

test('> Should fail with curly', async (assert) => {
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
if (foo) foo++;
  `;

  const [{ errorCount, messages }] = await cli.lintText(code);
  const [ { ruleId } ] = messages;

  assert.equal(errorCount, 1);
  assert.equal(ruleId, 'curly');
  assert.end();
});

test('> Should fix curly', async (assert) => {
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
if (foo) foo++;
  `;

  const [{ errorCount }] = await cli.lintText(code);

  assert.equal(errorCount, 0);
  assert.end();
});