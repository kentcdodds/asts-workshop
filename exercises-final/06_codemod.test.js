import fs from 'fs'
import * as babel from 'babel-core'
import nodeESModulePlugin from './06_codemod'

const esmFixFixture = require.resolve('./__testfixtures__/esm-fix/main.js')

const esmFixContent = fs.readFileSync(esmFixFixture, 'utf8')

test('codemods imports of CommonJS modules', () => {
  const {code} = babel.transform(esmFixContent, {
    filename: esmFixFixture,
    babelrc: false,
    plugins: [nodeESModulePlugin],
  })
  expect(code).toMatchSnapshot()
})

test('I submitted my elaboration and feedback', () => {
  const submitted = true
  expect(true).toBe(submitted)
})

//////// EXTRA CREDIT ////////

// If you get this far, try adding a few more tests,
// then file a pull request to add them to the extra credit!
// Learn more here: http://kcd.im/asts-workshop-contributing
