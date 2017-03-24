import * as babel from 'babel-core'
import jQueryHidePlugin from './07_codemod-demo'

test('codemods imports of CommonJS modules', () => {
  const source = `
    $(el).hide()
    foo.hide()
  `
  const {code} = babel.transform(source, {
    babelrc: false,
    plugins: [jQueryHidePlugin],
  })
  expect(code).toMatchSnapshot()
})
