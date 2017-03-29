const {stripIndent} = require('common-tags')
const {RuleTester} = require('eslint')
const rule = require('./04_eslint')

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
}

const ruleTester = new RuleTester()
ruleTester.run('no-old-bucket-streams-apis', rule, {
  valid: [
    valid(
      `
        import { request } from 'twitter'
      `,
    ),
    valid(
      `
        import * as twitter from 'twitter'
        twitter.request('/users')
      `,
    ),
  ],
  invalid: [
    invalid({
      code: `import { fetch } from 'twitter'`,
      output: `import { request } from 'twitter'`,
      errors: [
        {
          message: 'The twitter `fetch` API has been deprecated. Use `request`',
          type: 'ImportSpecifier',
        },
      ],
    }),
    invalid({
      code: `
        import * as twitter from 'twitter'
        twitter.fetch('/users')
      `,
      output: `
        import * as twitter from 'twitter'
        twitter.request('/users')
      `,
      errors: [
        {
          message: 'The twitter `fetch` API has been deprecated. Use `request`',
          type: 'Identifier',
        },
      ],
    }),
  ],
})

function valid(code) {
  return {
    code: stripIndent([code.trim()]),
    parserOptions,
  }
}

function invalid({code, output, ...rest}) {
  return {
    code: stripIndent([code.trim()]),
    output: stripIndent([output.trim()]),
    parserOptions,
    ...rest,
  }
}

// extra credit
// try to handle CommonJS
//   `const {fetch} = require('twitter')`
//   `const fetch = require('twitter').fetch`
//   `const twitter = require('twitter'); twitter.fetch()`

// WORKSHOP_START
//////// Elaboration & Feedback /////////
/*
http://ws.kcd.im/?ws=ASTs&e=04_eslint&em=
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
