const {RuleTester} = require('eslint')
const rule = require('./no-console-7')

const ruleTester = new RuleTester()
ruleTester.run('no-console', rule, {
  valid: [
    'info()',
    'console',
    'console.log',
    'console.baz()',
    {code: 'console.warn()', options: [{allowedMethods: ['warn']}]},
  ],
  invalid: [
    invalid('console.log()'),
    invalid('console.info()'),
    invalid('console.warn()'),
    {
      code: `
        var csl = console
        csl.log()

        var lcs = csl
        lcs.info()

        var scl = lcs
        scl.warn()
      `,
      errors: 3,
    },
  ],
})

function invalid(code) {
  return {
    code,
    errors: [{message: 'Using console is not allowed'}],
  }
}
