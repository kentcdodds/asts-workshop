import fs from 'fs'
import * as babel from 'babel-core'
import linePlugin from './03_babel-simple-demo'

const lineFixture = require.resolve('./fixtures/line.js')

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
