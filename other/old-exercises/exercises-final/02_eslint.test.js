const {stripIndent} = require('common-tags')
const {RuleTester} = require('eslint')
const rule = require('./02_eslint')

const ruleTester = new RuleTester()
ruleTester.run('embrace-booleans', rule, {
  valid: [
    valid(`var x = y ? a : z`),
    valid(`var x = y ? true : z`),
    valid(`var x = y ? false : z`),
    valid(`var x = y ? z : true`),
    valid(`var x = y ? z : false`),
  ],
  invalid: [
    invalid({
      code: `var x = y ? true : false`,
      output: `var x = Boolean(y)`,
      usage: 'Boolean(y)',
    }),
    invalid({
      code: `var x = y ? false : true`,
      output: `var x = !Boolean(y)`,
      usage: '!Boolean(y)',
    }),
    invalid({
      code: `var x = (y && z) ? false : true`,
      output: `var x = !Boolean(y && z)`,
      usage: '!Boolean(y && z)',
    }),
  ],
})

function valid(code) {
  return {
    code: stripIndent([code]),
  }
}

function invalid({code, output, usage, ...rest}) {
  return {
    code: stripIndent([code]),
    output: stripIndent([output]),
    errors: [
      {
        message: `Unnecessary ternary; Use ${usage} instead`,
        type: 'ConditionalExpression',
      },
    ],
    ...rest,
  }
}

test('I submitted my elaboration and feedback', () => {
  const submitted = true
  expect(true).toBe(submitted)
})

//////// EXTRA CREDIT ////////

// If you get this far, try adding a few more tests,
// then file a pull request to add them to the extra credit!
// Learn more here: http://kcd.im/asts-workshop-contributing
