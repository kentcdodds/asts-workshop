import * as babel from 'babel-core'
import * as recast from 'recast'
import {stripIndent} from 'common-tags'
import twitterFetchToRequest from './08_codemod-demo'

test('codemods imports of CommonJS modules', () => {
  const source = stripIndent`
    import { fetch } from 'twitter'
    import { fetch as blah } from 'twitter'
    import * as twitter from 'twitter'
    import log from 'logger'

    fetch('/user/kentcdodds').then(user => {
      log(user)
    })

    twitter.fetch('/user/captainsafia').then(user => {
      log(user)
    })

    twitter.delete('/account')
  `
  const {code} = babel.transform(source, {
    parserOpts: {parser: recast.parse},
    generatorOpts: {generator: recast.print, lineTerminator: '\n'},
    babelrc: false,
    plugins: [twitterFetchToRequest],
  })
  expect(code).toMatchSnapshot()
})
