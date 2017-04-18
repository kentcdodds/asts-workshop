// WORKSHOP_START
// TODO
// WORKSHOP_END
// FINAL_START
import {stripIndent} from 'common-tags'
import * as babel from 'babel-core'
import linePlugin from './05_babel-demo'

test('transpiles __line__ to the line number', () => {
  const source = stripIndent`
    console.log(__line__)

    function log(someLine = __line__) {
      console.log('the line', someLine, __line__)
    }
  `
  const {code} = babel.transform(source, {
    babelrc: false,
    plugins: [linePlugin],
  })
  expect(code).not.toContain('__line__')
  expect(code).toMatchSnapshot()
})
// FINAL_END
