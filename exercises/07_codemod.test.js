import * as babel from 'babel-core'
import * as recast from 'recast'
import {stripIndent} from 'common-tags'
import jQueryAddClassPlugin from './07_codemod'

test('codemods imports of CommonJS modules', () => {
  const source = stripIndent`
    $(el).addClass(className)
    foo.addClass(otherClassThing)
  `
  const {code} = babel.transform(source, {
    parserOpts: {parser: recast.parse},
    generatorOpts: {generator: recast.print},
    babelrc: false,
    plugins: [jQueryAddClassPlugin],
  })
  expect(code).toMatchSnapshot()
})

//////// Elaboration & Feedback /////////
/*
http://ws.kcd.im/?ws=ASTs&e=07_codemod&em=
*/
test('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(true).toBe(submitted)
})
////////////////////////////////

//////// EXTRA CREDIT ////////

// If you get this far, try adding a few more tests,
// then file a pull request to add them to the extra credit!
// Learn more here: http://kcd.im/asts-workshop-contributing
