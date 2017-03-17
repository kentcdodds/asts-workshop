const {stripIndent} = require('common-tags')
const {RuleTester} = require('eslint')
const rule = require('./02_eslint-advanced-demo')

const ruleTester = new RuleTester()
ruleTester.run('no-old-bucket-streams-apis', rule, {
  valid: [
    `
      import BucketStreamsAPI from 'bucket-streams-api'
      BucketStreamsAPI.get('/posts', {userId: '123', limit: 10})
    `,
    `
      const BSA = require('bucket-streams-api')
      BSA.get('/posts', {userId: '123', limit: 10})
    `,
  ].map(string => stripIndent([string.trim()])),
  invalid: [
    invalid(
      `
        import BucketStreamsAPI from 'bucket-streams-api'
        BucketStreamsAPI.request({
          url: '/followers',
          method: 'GET',
          userId: '123',
          limit: 10,
        })
      `,
      `
        import BSA from 'bucket-streams-api'
        BSA.request({
          url: '/posts',
          method: 'GET',
          userId: '123',
          limit: 10,
        })
      `,
      `
        const BSA = require('bucket-streams-api')
        BSA.request({
          url: '/posts',
          method: 'GET',
          userId: '123',
          limit: 10,
        })
      `,
    ),
  ],
})

function invalid(code, output = '') {
  return {
    code: stripIndent([code.trim()]),
    output: stripIndent([output.trim()]),
    errors: [{message: 'Block expected in alternate', type: 'IfStatement'}],
  }
}

// extra credit
// try to handle when it's imported like:
//   `import {default as BSA} from 'bucket-streams-api'`
// more extra credit
// try to handle when it's using desctructuring!
//   `const {request} = require('bucket-streams-api')
