// WORKSHOP_START
// TODO
// WORKSHOP_END
// FINAL_START
const {RuleTester} = require('eslint')
const rule = require('./01_eslint-demo')

const ruleTester = new RuleTester()
ruleTester.run('no-alert', rule, {
  valid: ['foo.alert()', 'balert()', 'alerts()', `var x = alert`],
  invalid: [
    {
      code: `alert()`,
      errors: [
        {
          message: 'Using alert is not allowed',
          type: 'CallExpression',
        },
      ],
    },
  ],
})
// FINAL_END
