import * as babel from 'babel-core'
import jQueryAddClassPlugin from './07_codemod'

test('codemods imports of CommonJS modules', () => {
  const source = `
    $(el).addClass(className);
    foo.addClass(otherClassThing);
  `
  const {code} = babel.transform(source, {
    babelrc: false,
    plugins: [jQueryAddClassPlugin],
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
