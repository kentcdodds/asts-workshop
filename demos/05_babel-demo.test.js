import fs from 'fs'
import * as babel from 'babel-core'
import linePlugin from './05_babel-demo'

const lineFixture = require.resolve('./__testfixtures__/line.js')

const lineContent = fs.readFileSync(lineFixture, 'utf8')

test('transpiles __line__ to the line number', () => {
  const {code} = babel.transform(lineContent, {
    filename: lineFixture,
    babelrc: false,
    plugins: [linePlugin],
  })
  expect(code).not.toContain('__line__')
  expect(code).toMatchSnapshot()
})
