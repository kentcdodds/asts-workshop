const {stripIndent} = require('common-tags')
const {RuleTester} = require('eslint')
const rule = require('./01_eslint-demo')

test('this will be tested eventually', () => {
  expect(true).toBe(true)
})

const parserOptions = {
  ecmaVersion: 6,
}

const ruleTester = new RuleTester()
ruleTester.run('no-blockless-switch-case', rule, {
  valid: valid(),
  invalid: invalid(),
})

function valid(validTests = []) {
  return validTests.map(code => ({
    code: stripIndent([code]),
    parserOptions,
  }))
}

function invalid(invalidTests = []) {
  return invalidTests.map(({code, output, ...rest}) => ({
    code: stripIndent([code]),
    output: stripIndent([output]),
    parserOptions,
    ...rest,
  }))
}
