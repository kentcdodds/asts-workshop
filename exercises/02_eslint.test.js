const {stripIndent} = require('common-tags')
const {RuleTester} = require('eslint')
const rule = require('./02_eslint')

const ruleTester = new RuleTester()
ruleTester.run('embrace-booleans', rule, {
  valid: [
    // what are some cases where this should
    // not report anything?
  ],
  invalid: [
    // what are some cases where this
    // should report an error?
    // What should the error say?
    // What should the fixed version look like?
  ],
})

//////// Elaboration & Feedback /////////
/*
http://ws.kcd.im/?ws=ASTs&e=02_eslint-embrace-boolean&em=
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
