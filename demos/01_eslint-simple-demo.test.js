const {stripIndent} = require('common-tags')
const {RuleTester} = require('eslint')
const rule = require('./01_eslint-simple-demo')

const ruleTester = new RuleTester()
ruleTester.run('no-blockless-if', rule, {
  valid: [
    `
      if (foo) {
        foo()
      }
    `,
    `
      if (foo && bar) {
        foo()
        bar()
      }
    `,
    `if (foo || baz) { (foo || baz)() }`,
    `
      if (baz) {
        baz()
      } else {
        bar()
      }
    `,
    `
      if (baz) {
        baz()
      } else if (bar) {
        bar()
      } else {
        buzz()
      }
    `,
  ].map(string => stripIndent([string])),
  invalid: [
    invalidConsequent(
      `if (foo) foo()`,
      `
        if (foo) {foo()}
      `,
    ),
    invalidConsequent(
      `
        if (foo)
          foo()
      `,
      `
      if (foo)
        {foo()}
      `,
    ),
    invalidConsequent(
      `
        if (foo && bar)
          foo()
          bar()
      `,
      `
        if (foo && bar)
          {foo()}
          bar()
      `,
    ),
    invalidConsequent(
      `if (foo || bar) (foo || bar)()`,
      `if (foo || bar) {(foo || bar)()}`,
    ),
    invalidAlternate(
      `
        if (baz) {
          baz()
        } else
          bar()
      `,
      `
        if (baz) {
          baz()
        } else
          {bar()}
      `,
    ),
    invalidAlternate(
      `
        if (baz) {
          baz()
        } else bar()
      `,
      `
        if (baz) {
          baz()
        } else {bar()}
      `,
    ),
    {
      code: stripIndent`
        if (baz) baz()
        else bar()
      `,
      output: stripIndent`
        if (baz) {baz()}
        else {bar()}
      `,
      errors: [
        {message: 'Block expected in consequent', type: 'IfStatement'},
        {message: 'Block expected in alternate', type: 'IfStatement'},
      ],
    },
  ],
})

function invalidConsequent(code, output = '') {
  return {
    code: stripIndent([code]),
    output: stripIndent([output]),
    errors: [{message: 'Block expected in consequent', type: 'IfStatement'}],
  }
}

function invalidAlternate(code, output = '') {
  return {
    code: stripIndent([code]),
    output: stripIndent([output]),
    errors: [{message: 'Block expected in alternate', type: 'IfStatement'}],
  }
}
