const {stripIndent} = require('common-tags')
const {RuleTester} = require('eslint')
const rule = require('./02_eslint-demo')

const parserOptions = {
  ecmaVersion: 6,
}

const ruleTester = new RuleTester()
ruleTester.run('no-unnecessary-ternary', rule, {
  valid: [
    valid(`var x = Boolean(condition) || value`),
    valid(`var x = !Boolean(condition) || value`),
    valid(`var x = condition ? false : value`),
  ],
  invalid: [
    invalid({
      code: `var x = condition ? true : value`,
      output: `var x = Boolean(condition) || value`,
      errors: [
        {
          message: 'Simplify ternary to logical expression',
          type: 'ConditionalExpression',
        },
      ],
    }),
  ],
})

function valid(code) {
  return {
    code: stripIndent([code]),
    parserOptions,
  }
}

function invalid({code, output, ...rest}) {
  return {
    code: stripIndent([code]),
    output: stripIndent([output]),
    parserOptions,
    ...rest,
  }
}
