import fs from 'fs'
import * as babel from 'babel-core'
import handlebarsPrecompilePlugin from './06_babel'

const bookListPath = require.resolve(
  './__testfixtures__/handlebars-exercise/book-list',
)

const bookListCode = fs.readFileSync(bookListPath, 'utf8')

test('transpiled Handlebars.compile to Handlebars.template', () => {
  const {code} = babel.transform(bookListCode, {
    filename: bookListPath,
    babelrc: false,
    plugins: [handlebarsPrecompilePlugin],
  })
  expect(code).not.toContain('Handlebars.compile')
  expect(code).toContain('Handlebars.template')
  expect(code).toMatchSnapshot()
})
