import stripIndent from 'strip-indent'
import * as babel from 'babel-core'
import captainsLog from './captains-log-0'

test('transpiles console.log calls to include the function name', () => {
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
      add(1, 2)
      subtract(2, 1)
      console.log('sup dawg')
    `,
  ).trim()
  const code = transpile(source)
  expect(code).toMatchSnapshot()
})

function transpile(source) {
  const {code} = babel.transform(source, {
    babelrc: false,
    plugins: [captainsLog],
  })
  return code
}
