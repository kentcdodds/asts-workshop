const {stripIndent} = require('common-tags')
const {RuleTester} = require('eslint')
const rule = require('./02_eslint-advanced-demo')

const ruleTester = new RuleTester()
ruleTester.run('no-old-bucket-streams-apis', rule, {
  valid: [
    `BucketStreamsAPI.get('/posts', {userId: user.id, limit})`,
  ].map(string => stripIndent([string])),
  invalid: [
    invalid(
      `
        BucketStreamsAPI.request({
          url: '/followers',
          method: 'GET',
          userId: user.id,
          limit,
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
