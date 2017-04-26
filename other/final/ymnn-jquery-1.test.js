import stripIndent from 'strip-indent'
import * as babel from 'babel-core'
import captainsLog from './captains-log-1'

test('transpiles jquery-hide calls to raw DOM APIs', () => {
  const source = stripIndent(
    `
      $(el).hide()
      foo.hide()
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
