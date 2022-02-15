/* eslint-disable @typescript-eslint/no-var-requires */
const test = require('tape');
const eslint = require('eslint');
const { resolve } = require('path');

test('> Should fail with sort-keys', async (assert) => {
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
const obj = {one: 1, two: 3, four: 2};
obj.toString();
  `;

  const [{ errorCount, messages }] = await cli.lintText(code);
  const [ { ruleId } ] = messages;

  assert.equal(errorCount, 1);
  assert.equal(ruleId, 'sort-keys');
  assert.end();
});