import assert from 'assert'
import path from 'path'
import fs from 'fs'
import merge from 'lodash.merge'
import invariant from 'invariant'
import * as recast from 'recast'
import * as babel from 'babel-core'
import stripIndent from 'strip-indent'
import {oneLine} from 'common-tags'

export default testBabel

const fullDefaultConfig = {
  parserOpts: {parser: recast.parse},
  generatorOpts: {generator: recast.print, lineTerminator: '\n'},
  babelrc: false,
}

function testBabel({
  plugin = requiredParam('plugin'),
  pluginName = getPluginName(plugin),
  tests,
  fixtures,
  ...rest
}) {
  const testerConfig = merge({}, fullDefaultConfig, rest)

  describe(pluginName, () => {
    tests.forEach((testConfig = {}, index) => {
      const {modifier, title, code, babelOptions, output, snapshot} = merge(
        {},
        testerConfig,
        toTestConfig({testConfig, index, plugin, pluginName, fixtures}),
      )

      if (modifier) {
        it[modifier](title, tester)
      } else {
        it(title, tester)
      }

      function tester() {
        invariant(code, 'a string or code property must be provided')
        if (snapshot) {
          invariant(
            !output,
            '`output` cannot be provided with `snapshot: true`',
          )
        }
        const formattedCode = stripIndent(code).trim()
        const {code: result} = babel.transform(formattedCode, babelOptions)
        if (snapshot) {
          if (result === code) {
            throw new Error(
              oneLine`
                Code was unmodified but attempted to take a snapshot.
                If the code should not be modified, set \`snapshot: false\`
              `,
            )
          }
          const separator = '\n\n      ↓ ↓ ↓ ↓ ↓ ↓\n\n'
          const formattedOutput = [formattedCode, separator, result].join('')
          expect(`\n${formattedOutput}\n`).toMatchSnapshot(title)
        } else if (output) {
          assert.equal(result, output, 'Output is incorrect.')
        } else {
          assert.equal(
            result,
            code,
            'Expected output to not change, but it did',
          )
        }
      }
    })
  })
}

function toTestConfig({testConfig, index, plugin, pluginName, fixtures}) {
  if (typeof testConfig === 'string') {
    testConfig = {code: testConfig}
  }
  const {
    title,
    code,
    fixture,
    fullTitle = `${index + 1}. ${title || pluginName}`,
  } = testConfig
  return merge(
    {},
    testConfig,
    {babelOptions: {plugins: [plugin]}},
    {
      title: fullTitle,
      code: code || getCode(fixtures, fixture),
    },
  )
}

function getCode(fixtures, fixture) {
  let fullPath = fixture
  if (!path.isAbsolute(fixture)) {
    fullPath = path.join(fixtures, fixture)
  }
  return fs.readFileSync(fullPath, 'utf8')
}

function requiredParam(name) {
  return () => {
    invariant(false, `${name} is a required parameter.`)
  }
}

function getPluginName(plugin) {
  let name
  try {
    name = plugin(babel).name
  } catch (error) {
    console.error(
      oneLine`
        Attempting to infer the name of your plugin failed.
        Tried to invoke the plugin which threw the error.
      `,
    )
    throw error
  }
  invariant(name, 'The `pluginName` must be inferrable or provided.')
  return name
}
