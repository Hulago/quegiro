/* eslint-disable @typescript-eslint/no-var-requires */
const { cli } = require('./eslint');
const test = require('tape');

test('> Should fail with console.log', async (assert) => {
  assert.plan(2);

  const code = `
const count = 1;
console.log(count);
  `;

  const [{ errorCount, messages }] = await cli.lintText(code);
  const [ { ruleId } ] = messages;

  assert.equal(errorCount, 1);
  assert.equal(ruleId, 'no-console');
  assert.end();
});