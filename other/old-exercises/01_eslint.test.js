const {RuleTester} = require('eslint')
const rule = require('./01_eslint')

const ruleTester = new RuleTester()
ruleTester.run('no-console', rule, {
  // WORKSHOP_START
  valid: [],
  invalid: [],
  // WORKSHOP_END
  // FINAL_START
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
  // FINAL_END
})

// WORKSHOP_START
//////// Elaboration & Feedback /////////
/*
http://ws.kcd.im/?ws=ASTs&e=01_eslint-no-console&em=
*/
test('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(true).toBe(submitted)
})
////////////////////////////////
// WORKSHOP_END
// FINAL_START
test('I submitted my elaboration and feedback', () => {
  const submitted = true
  expect(true).toBe(submitted)
})
// FINAL_END

//////// EXTRA CREDIT ////////

// If you get this far, try adding a few more tests,
// then file a pull request to add them to the extra credit!
// Learn more here: http://kcd.im/asts-workshop-contributing
