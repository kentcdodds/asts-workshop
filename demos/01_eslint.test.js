const {stripIndent} = require('common-tags')
const {RuleTester} = require('eslint')
const rule = require('./01_eslint')

const parserOptions = {
  ecmaVersion: 6,
}

const ruleTester = new RuleTester()
ruleTester.run('no-blockless-switch-case', rule, {
  valid: [
    valid(
      `
        switch (green) {
          case 'orange': {
            color = colors.purple
            break
          }
          case 'blue': {
            color = colors.black
            break
          }
          default: {
            color = colors.white
            break
          }
        }
      `,
    ),
  ],
  invalid: [
    invalid({
      code: `
        switch (green) {
          case 'orange':
            color = colors.purple
            break
          default: color = colors.white
        }
      `,
      output: `
        switch (green) {
          case 'orange':
            {color = colors.purple
        break}
          default: {color = colors.white}
        }
      `,
      errors: [
        {message: 'Switch cases should use a block', type: 'SwitchCase'},
        {message: 'Switch cases should use a block', type: 'SwitchCase'},
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

// WORKSHOP_START
//////// Elaboration & Feedback /////////
/*
http://ws.kcd.im/?ws=ASTs&e=&em=
*/
/*
test('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(true).toBe(submitted)
})
////////////////////////////////
// WORKSHOP_END
// FINAL_START
test('I submitted my elaboration and feedback', () => {
  const submitted = true // change this when you've submitted!
  expect(true).toBe(submitted)
})
// FINAL_END

//////// EXTRA CREDIT ////////

// If you get this far, try adding a few more tests,
// then file a pull request to add them to the extra credit!
// Learn more here: http://kcd.im/asts-workshop-contributing
*/
