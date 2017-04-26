const {RuleTester} = require('eslint')
const rule = require('./01_eslint')

const ruleTester = new RuleTester()
ruleTester.run('no-console', rule, {
  valid: ['foo.console()', 'console()', 'info()'],
  invalid: [
    {
      code: `console.log()`,
      errors: [
        {
          message: 'Using console is not allowed',
          type: 'MemberExpression',
        },
      ],
    },
  ],
})

test('I submitted my elaboration and feedback', () => {
  const submitted = true
  expect(true).toBe(submitted)
})

//////// EXTRA CREDIT ////////

// If you get this far, try adding a few more tests,
// then file a pull request to add them to the extra credit!
// Learn more here: http://kcd.im/asts-workshop-contributing
