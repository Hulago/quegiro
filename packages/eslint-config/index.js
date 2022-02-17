module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    legacyDecorators: true,
    experimentalDecorators: true
  },
  extends: ['plugin:vue/recommended', '@vue/typescript/recommended'],
  plugins: [
    'import',
    'jest',
    'new-with-error',
    'simple-import-sort',
    'sort-class-members',
    'sort-destructure-keys',
    'switch-case'
  ],
  rules: {
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true,
        offsetTernaryExpressions: false
      }
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'arrow-body-style': [
      'error',
      'as-needed',
      {
        requireReturnForObjectLiteral: false
      }
    ],
    'class-methods-use-this': 'off',
    'comma-dangle': ['error', 'never'],
    'comma-spacing': [1, { after: true, before: false }],
    curly: ['error', 'all'],
    'id-length': [
      'error',
      {
        exceptions: ['e', 'i', 'h', 't']
      }
    ],
    'id-match': [
      'error',
      '_count|^[a-zA-Z][a-zA-Z0-9]*$|^[A-Z][_A-Z0-9]+[A-Z0-9]$',
      {
        onlyDeclarations: true,
        properties: true
      }
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    indent: 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'lines-around-comment': [
      'error',
      {
        afterBlockComment: false,
        allowBlockStart: true,
        beforeBlockComment: true
      }
    ],
    'max-len': [
      'error',
      {
        code: 120,
        comments: 100,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: false,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: false,
        ignoreUrls: true,
        tabWidth: 2
      }
    ],
    'max-params': ['error', 3],
    'no-console': [
      'error',
      {
        allow: ['error', 'info']
      }
    ],
    'no-duplicate-imports': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1
      }
    ],
    'no-restricted-syntax': [
      'error',
      {
        // eslint-disable-next-line max-len
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
        selector: 'ForInStatement'
      },
      {
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        selector: 'LabeledStatement'
      },
      {
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        selector: 'WithStatement'
      }
    ],
    'no-unused-vars': 'error',
    'object-curly-newline': 'off',
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true
      }
    ],
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true
      }
    ],
    quotes: ['error', 'single'],
    semi: 'error',
    'semi-spacing': 'error',
    'simple-import-sort/sort': 'error',
    'sort-destructure-keys/sort-destructure-keys': [
      'error',
      {
        caseSensitive: true
      }
    ],
    'sort-imports': 'off',
    'sort-keys': [
      'error',
      'asc',
      {
        natural: true
      }
    ],
    'sort-class-members/sort-class-members': [
      'error',
      {
        accessorPairPositioning: 'getThenSet',
        groups: {
          emits: [{ name: '/emit.+/', type: 'method' }],
          getters: [{ kind: 'get', type: 'method' }],
          injects: [{ groupByDecorator: 'Inject', type: 'property' }],
          props: [{ groupByDecorator: 'Prop', type: 'property' }],
          provides: [{ groupByDecorator: 'Provide', type: 'property' }],
          model: [{ groupByDecorator: 'Model', type: 'property' }],
          vmodel: [{ groupByDecorator: 'VModel', type: 'property' }],
          setters: [{ kind: 'set', type: 'method' }],
          'vue-activated': [{ name: 'activated', type: 'method' }],
          'vue-before-create': [{ name: 'beforeCreate', type: 'method' }],
          'vue-before-mount': [{ name: 'beforeMount', type: 'method' }],
          'vue-before-unmount': [{ name: 'beforeUnmount', type: 'method' }],
          'vue-before-update': [{ name: 'beforeUpdate', type: 'method' }],
          'vue-created': [{ name: 'created', type: 'method' }],
          'vue-deactivated': [{ name: 'deactivated', type: 'method' }],
          'vue-error-captured': [{ name: 'errorCaptured', type: 'method' }],
          'vue-mounted': [{ name: 'mounted', type: 'method' }],
          'vue-render-tracked': [{ name: 'renderTracked', type: 'method' }],
          'vue-render-triggered': [{ name: 'renderTriggered', type: 'method' }],
          'vue-unmounted': [{ name: 'unmounted', type: 'method' }],
          'vue-updated': [{ name: 'updated', type: 'method' }],
          handlers: [{ name: '/handle.+/', type: 'method' }],
          watches: [{ groupByDecorator: 'Watch', type: 'method' }]
        },
        order: [
          '[static-properties]',
          '[static-methods]',
          '[properties]',
          '[injects]',
          '[model]',
          '[vmodel]',
          '[provides]',
          '[props]',
          '[emits]',
          '[getters]',
          '[setters]',
          'constructor',
          '[vue-before-create]',
          '[vue-created]',
          '[vue-before-mount]',
          '[vue-mounted]',
          '[vue-before-update]',
          '[vue-updated]',
          '[vue-before-unmount]',
          '[vue-unmounted]',
          '[vue-error-captured]',
          '[vue-render-tracked]',
          '[vue-render-triggered]',
          '[vue-activated]',
          '[methods]',
          '[handlers]',
          '[watches]'
        ]
      }
    ],
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never'
      }
    ],
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': 'error',
    'vue/order-in-components': 'off'
  }
};
