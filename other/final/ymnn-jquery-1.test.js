import stripIndent from 'strip-indent'
import * as babel from 'babel-core'
import * as recast from 'recast'
import ymnnJquery from './ymnn-jquery-1'

test('transpiles jquery calls to raw DOM APIs', () => {
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
    parserOpts: {parser: recast.parse},
    generatorOpts: {generator: recast.print},
    babelrc: false,
    plugins: [ymnnJquery],
  })
  return code
}
