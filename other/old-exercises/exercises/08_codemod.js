import nodePath from 'path'
import fs from 'fs'
import * as babylon from 'babylon'
import * as babel from 'babel-core'
import {oneLine} from 'common-tags'
import isBuiltinModule from 'is-builtin-module'

const {types: t} = babel

export default importCommonJSPlugin

function importCommonJSPlugin() {
  return {
    name: 'node-esmodule',
    visitor: {
      // You'll need to fill this out yourself. I've left a few
      // utilities that you might find helpful.
    },
  }
}

function splitSpecifiers(specifiers) {
  return specifiers.reduce(
    (acc, specifier) => {
      if (t.isImportSpecifier(specifier)) {
        acc.namedSpecifiers.push(specifier)
      } else if (t.isImportNamespaceSpecifier(specifier)) {
        acc.namespaceSpecifier = specifier
      } else if (t.isImportDefaultSpecifier(specifier)) {
        acc.defaultSpecifier = specifier
      }
      return acc
    },
    {namedSpecifiers: []},
  )
}

function isCommonJSModule(sourceString, filename) {
  if (isRelativePath(sourceString)) {
    const fullPath = nodePath.resolve(nodePath.dirname(filename), sourceString)
    return !exportsAsESModule(require.resolve(fullPath))
  } else if (nodePath.isAbsolute(sourceString)) {
    return !exportsAsESModule(require.resolve(sourceString))
  } else if (isBuiltinModule(sourceString)) {
    return true
  } else {
    // eslint-disable-next-line no-console
    console.warn(
      oneLine`
        import for "${sourceString}" was unable
        to be identified as commonJS or ESM
      `,
    )
    return false
  }
}

function isRelativePath(string) {
  return string.startsWith('.')
}

function exportsAsESModule(modulePath) {
  const contents = fs.readFileSync(modulePath, 'utf8')
  try {
    const ast = babylon.parse(contents, {
      sourceType: 'module',
    })
    let hasExportSpecifier = false
    babel.traverse(ast, {
      ExportSpecifier(path) {
        hasExportSpecifier = true
        path.stop()
      },
    })
    return hasExportSpecifier
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`unable to parse "${modulePath}"`, error)
    return false
  }
}
