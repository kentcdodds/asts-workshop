import stripIndent from 'strip-indent'
import * as recast from 'recast'
import * as babel from 'babel-core'
import captainsLog from './captains-log-4'

test('transpiles console.log calls to include contextual info', () => {
  const source = stripIndent(
    `
      function add(a, b) {
        console.log(a, b)
        return a + b
      }

      function subtract(a, b) {
        console.log(a, b)
        return a - b
      }

      const multiply = (a, b) => {
        console.log(a, b)
        return a * b
      }

      const divide = function(a, b) {
        console.log(a, b)
        return a / b
      }

      add(1, 2)
      subtract(2, 1)
      multiply(3, 4)
      divide(25, 5)
      console.log('sup dawg')
    `,
  ).trim()
  const code = transpile(source)
  expect(code).toMatchSnapshot()
})

function transpile(source) {
  const {code} = babel.transform(source, {
    parserOpts: {parser: recast.parse},
    generatorOpts: {generator: recast.print, lineTerminator: '\n'},
    babelrc: false,
    plugins: [captainsLog],
  })
  return code
}
