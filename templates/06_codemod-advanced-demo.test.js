import fs from 'fs'
import * as babel from 'babel-core'
import nodeESModulePlugin from './06_codemod-advanced-demo'

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
