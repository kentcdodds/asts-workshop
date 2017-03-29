import fs from 'fs'
import nodePath from 'path'
import * as babylon from 'babylon'
import Handlebars from 'handlebars'

export default handlebarsPrecompilePlugin

function handlebarsPrecompilePlugin({types: t, template}) {
  return {
    name: 'handlebars-precompile',
    visitor: {
      ImportDeclaration(path, {file}) {
        if (!path.node.source.value.endsWith('.handlebars')) {
          return
        }
        const local = path.get('specifiers')[0].get('local')
        const buildVariableDeclaration = template(
          `const IMPORT_NAME = PRECOMPILED`,
        )
        path.insertAfter(
          buildVariableDeclaration({
            IMPORT_NAME: t.identifier(local.node.name),
            PRECOMPILED: getPrecompiledTemplate(
              path.node.source.value,
              file.opts.filename,
            ),
          }),
        )
        const binding = local.scope.getBinding(local.node.name)
        const refs = binding.referencePaths
        const caller = refs[0].find(t.isCallExpression)
        caller.get('callee.property').replaceWith(t.identifier('template'))
        path.remove()
      },
    },
  }

  function getPrecompiledTemplate(relativePath, filename) {
    const fullPath = nodePath.resolve(nodePath.dirname(filename), relativePath)
    const precompiledString = Handlebars.precompile(
      fs.readFileSync(fullPath, 'utf8'),
    )
    const precompiledAST = babylon.parse(
      `(function() { return ${precompiledString} })();`,
    ).program.body
    return precompiledAST
  }
}
