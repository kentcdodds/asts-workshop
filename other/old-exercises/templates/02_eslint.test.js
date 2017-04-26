const {stripIndent} = require('common-tags')
const {RuleTester} = require('eslint')
const rule = require('./02_eslint')

const ruleTester = new RuleTester()
ruleTester.run('embrace-booleans', rule, {
  valid: [
    // WORKSHOP_START
    // what are some cases where this should
    // not report anything?
    // WORKSHOP_END
    // FINAL_START
    valid(`var x = y ? a : z`),
    valid(`var x = y ? true : z`),
    valid(`var x = y ? false : z`),
    valid(`var x = y ? z : true`),
    valid(`var x = y ? z : false`),
    // FINAL_END
  ],
  invalid: [
    // WORKSHOP_START
    // what are some cases where this
    // should report an error?
    // What should the error say?
    // What should the fixed version look like?
    // WORKSHOP_END
    // FINAL_START
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
    // FINAL_END
  ],
})

// FINAL_START
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
// FINAL_END

// WORKSHOP_START
//////// Elaboration & Feedback /////////
/*
http://ws.kcd.im/?ws=ASTs&e=02_eslint-embrace-boolean&em=
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
