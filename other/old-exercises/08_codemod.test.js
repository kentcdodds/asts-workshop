import fs from 'fs'
import * as babel from 'babel-core'
import * as recast from 'recast'
import nodeESModulePlugin from './08_codemod'

const esmFixFixture = require.resolve('./__testfixtures__/esm-fix/main.js')

const esmFixContent = fs.readFileSync(esmFixFixture, 'utf8')

test('codemods imports of CommonJS modules', () => {
  const {code} = babel.transform(esmFixContent, {
    filename: esmFixFixture,
    parserOpts: {parser: recast.parse},
    generatorOpts: {generator: recast.print, lineTerminator: '\n'},
    babelrc: false,
    plugins: [nodeESModulePlugin],
  })
  expect(code).toMatchSnapshot()
})

// WORKSHOP_START
//////// Elaboration & Feedback /////////
/*
http://ws.kcd.im/?ws=ASTs&e=08_codemod-import-cjs&em=
*/
test('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(true).toBe(submitted)
})
////////////////////////////////
// WORKSHOP_END
// FINAL_START
test('I submitted my elaboration and feedback', () => {
  const submitted = true
  expect(true).toBe(submitted)
})
// FINAL_END

//////// EXTRA CREDIT ////////

// If you get this far, try adding a few more tests,
// then file a pull request to add them to the extra credit!
// Learn more here: http://kcd.im/asts-workshop-contributing
