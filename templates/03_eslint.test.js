import {stripIndent} from 'common-tags'
import {RuleTester} from 'eslint'
import rule from './03_eslint'

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
    invalidConsequent(`if (foo) foo()`, `if (foo) {foo()}`),
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
    code: stripIndent([code.trim()]),
    output: stripIndent([output.trim()]),
    errors: [{message: 'Block expected in consequent', type: 'IfStatement'}],
  }
}

function invalidAlternate(code, output = '') {
  return {
    code: stripIndent([code.trim()]),
    output: stripIndent([output.trim()]),
    errors: [{message: 'Block expected in alternate', type: 'IfStatement'}],
  }
}

// WORKSHOP_START
//////// Elaboration & Feedback /////////
/*
http://ws.kcd.im/?ws=ASTs&e=03_eslint-no-blockless-if&em=
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
