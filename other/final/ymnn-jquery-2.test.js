import stripIndent from 'strip-indent'
import * as recast from 'recast'
import * as babel from 'babel-core'
import ymnnJquery from './ymnn-jquery-2'

test('transpiles jquery calls to raw DOM APIs', () => {
  const source = stripIndent(
    `
      $(el).hide()
      foo.hide()

      $(el).show()
      bar.show()
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
