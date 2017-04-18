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
      // WORKSHOP_START
      // You'll need to fill this out yourself. I've left a few
      // utilities that you might find helpful.
      // WORKSHOP_END
      // FINAL_START
      ImportDeclaration(path, {file}) {
        let memberObjectNameIdentifier
        const {
          defaultSpecifier,
          namespaceSpecifier,
          namedSpecifiers,
        } = splitSpecifiers(path.get('specifiers'))

        const {node: {value: source}} = path.get('source')

        const specifiersExist =
          Boolean(namedSpecifiers.length) || Boolean(namespaceSpecifier)
        const isCJS = isCommonJSModule(source, file.opts.filename)
        if (!specifiersExist || !isCJS) {
          return
        }
        if (defaultSpecifier) {
          memberObjectNameIdentifier = defaultSpecifier.node.local
        } else if (namespaceSpecifier) {
          memberObjectNameIdentifier = namespaceSpecifier.node.local
          namespaceSpecifier.replaceWith(
            t.importDefaultSpecifier(memberObjectNameIdentifier),
          )
        } else {
          memberObjectNameIdentifier = path.scope.generateUidIdentifier(source)
          path.node.specifiers.push(
            t.importDefaultSpecifier(memberObjectNameIdentifier),
          )
        }
        namedSpecifiers.forEach(specifier => {
          const {node: {imported: {name}}} = specifier
          const {referencePaths} = specifier.scope.getBinding(name)
          referencePaths.forEach(refPath => {
            refPath.replaceWith(
              t.memberExpression(
                memberObjectNameIdentifier,
                t.identifier(name),
              ),
            )
          })
          specifier.remove()
        })
      },
      // FINAL_END
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
