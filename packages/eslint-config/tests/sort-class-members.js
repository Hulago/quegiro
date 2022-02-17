/* eslint-disable @typescript-eslint/no-var-requires */
const test = require('tape');
const eslint = require('eslint');
const { resolve } = require('path');

test('> Should fail static before constructor', async (assert) => {
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
class ForStatic {
  constructor() {
    super();
  }

  static beforeCtor() {
    return true;
  }
}

new ForStatic();
  `;

  const [{ errorCount, messages = [] }] = await cli.lintText(code);
  const [{ ruleId }] = messages;

  assert.equal(errorCount, 1);
  assert.equal(ruleId, 'sort-class-members/sort-class-members');
  assert.end();
});

test('> Should fail properties before constructor', async (assert) => {
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
class Foo {
  constructor() {
    super();
  }

  name = 'Hello';

  age = 12;

  private fullName = 'Hi there';
}

new Foo();
  `;

  const [{ errorCount, messages = [] }] = await cli.lintText(code);
  const [{ ruleId }] = messages;

  assert.equal(errorCount, 3);
  assert.equal(ruleId, 'sort-class-members/sort-class-members');
  assert.end();
});

test('> Should fail methods before constructor', async (assert) => {
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
class Foo {
  myName() {
    return 'Hello';
  }

  private myAge() {
    return 12;
  }

  constructor() {
    super();
  }
}

new Foo();
  `;

  const [{ errorCount, messages = [] }] = await cli.lintText(code);
  const [{ ruleId }] = messages;

  assert.equal(errorCount, 2);
  assert.equal(ruleId, 'sort-class-members/sort-class-members');
  assert.end();
});

test('> Should fail handle methods before constructor', async (assert) => {
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
class Foo {
  myName() {
    return 'Hello';
  }

  private myAge() {
    return 12;
  }

  constructor() {
    super();
  }
}

new Foo();
  `;

  const [{ errorCount, messages = [] }] = await cli.lintText(code);
  const [{ ruleId }] = messages;

  assert.equal(errorCount, 2);
  assert.equal(ruleId, 'sort-class-members/sort-class-members');
  assert.end();
});

test('> Should fail lifecycle vue methods', async (assert) => {
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
class Foo {
  myName() {
    return 'Hello';
  }

  beforeCreate() {
    return 'foo';
  }

  beforeMount() {
    return 'foo';
  }

  created() {
    return 'hello';
  }
}

new Foo();
  `;

  const [{ errorCount, messages = [] }] = await cli.lintText(code);
  const [{ ruleId }] = messages;

  assert.equal(errorCount, 4);
  assert.equal(ruleId, 'sort-class-members/sort-class-members');
  assert.end();
});

test('> Should fail watchers vue methods', async (assert) => {
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
class Foo {
  @Watch('cenas')
  handleCenas(value) {
    return value;
  }

  myName() {
    return 'Hello';
  }
}

new Foo();
  `;

  const [{ errorCount, messages = [] }] = await cli.lintText(code);
  const [{ ruleId }] = messages;

  assert.equal(errorCount, 1);
  assert.equal(ruleId, 'sort-class-members/sort-class-members');
  assert.end();
});