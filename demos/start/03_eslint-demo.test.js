const {stripIndent} = require('common-tags')
const {RuleTester} = require('eslint')
const rule = require('./03_eslint-demo')

const parserOptions = {
  ecmaVersion: 6,
}

const ruleTester = new RuleTester()
ruleTester.run('no-blockless-switch-case', rule, {
  valid: valid([
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
  ]),
  invalid: invalid([
    {
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
    },
  ]),
})

function valid(validTests) {
  return validTests.map(code => ({
    code: stripIndent([code]),
    parserOptions,
  }))
}

function invalid(invalidTests) {
  return invalidTests.map(({code, output, ...rest}) => ({
    code: stripIndent([code]),
    output: stripIndent([output]),
    parserOptions,
    ...rest,
  }))
}
