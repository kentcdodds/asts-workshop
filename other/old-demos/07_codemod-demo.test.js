import * as babel from 'babel-core'
import * as recast from 'recast'
import {stripIndent} from 'common-tags'
import jQueryHidePlugin from './07_codemod-demo'

test('codemods imports of CommonJS modules', () => {
  const source = stripIndent`
    $(el).hide()
    foo.hide()
  `
  const {code} = babel.transform(source, {
    parserOpts: {parser: recast.parse},
    generatorOpts: {generator: recast.print, lineTerminator: '\n'},
    babelrc: false,
    plugins: [jQueryHidePlugin],
  })
  expect(code).toMatchSnapshot()
})
