import {stripIndent} from 'common-tags'
import * as babel from 'babel-core'
import devPlugin from './05_babel'

const env = process.env.NODE_ENV

afterEach(() => {
  process.env.NODE_ENV = env
})

test('transpiles __DEV__ to false', () => {
  process.env.NODE_ENV = 'production'
  const source = stripIndent`
    if (__DEV__) {
      console.log('You are in dev mode!')
    }
  `
  const {code} = babel.transform(source, {
    babelrc: false,
    plugins: [devPlugin],
  })
  expect(code).not.toContain('__DEV__')
  expect(code).toMatchSnapshot()
})

test('transpiles __DEV__ to true', () => {
  process.env.NODE_ENV = 'development'
  const source = stripIndent`
    if (__DEV__) {
      console.log('You are in dev mode!')
    }
  `
  const {code} = babel.transform(source, {
    babelrc: false,
    plugins: [devPlugin],
  })
  expect(code).not.toContain('__DEV__')
  expect(code).toMatchSnapshot()
})

// WORKSHOP_START
//////// Elaboration & Feedback /////////
/*
http://ws.kcd.im/?ws=ASTs&e=05_babel-dev-mode&em=
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
