import fs from 'fs'
import * as babel from 'babel-core'
import i18nPlugin from './06_babel-demo'

const appI18nPath = require.resolve('./__testfixtures__/i18n-demo/app-i18n')

const appI18n = fs.readFileSync(appI18nPath, 'utf8')

test('transpiles __i18n__ to the string it represents', () => {
  const {code} = babel.transform(appI18n, {
    parserOpts: {
      plugins: ['jsx'],
    },
    filename: appI18nPath,
    babelrc: false,
    plugins: [i18nPlugin],
  })
  expect(code).not.toContain('__i18n__')
  expect(code).toMatchSnapshot()
})

test('accepts an option for the language', () => {
  const {code} = babel.transform(appI18n, {
    parserOpts: {
      plugins: ['jsx'],
    },
    filename: appI18nPath,
    babelrc: false,
    plugins: [[i18nPlugin, {lang: 'es'}]],
  })
  expect(code).not.toContain('__i18n__')
  expect(code).toMatchSnapshot()
})
