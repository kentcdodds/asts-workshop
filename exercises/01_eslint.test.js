const {RuleTester} = require('eslint')
const rule = require('./01_eslint')

const ruleTester = new RuleTester()
ruleTester.run('no-console', rule, {
  valid: [],
  invalid: [],
})

//////// Elaboration & Feedback /////////
/*
http://ws.kcd.im/?ws=ASTs&e=01_eslint&em=
*/
test('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(true).toBe(submitted)
})
////////////////////////////////

//////// EXTRA CREDIT ////////

// If you get this far, try adding a few more tests,
// then file a pull request to add them to the extra credit!
// Learn more here: http://kcd.im/asts-workshop-contributing
