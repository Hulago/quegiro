/* eslint-disable @typescript-eslint/no-var-requires */
const { cli } = require('./eslint');
const test = require('tape');

test('> Should off on interface prefix', async (assert) => {
  assert.plan(1);

  const code = `
  	interface Xpto {
      count: number;
    }
  `;

  const [{ messages, warningCount }] = await cli.lintText(code);
  // const [ { ruleId } ] = messages;

  assert.equal(warningCount, 0);
  // assert.equal(ruleId, '@typescript-eslint/interface-name-prefix');
  assert.end();
});