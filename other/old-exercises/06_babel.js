import fs from 'fs'
import nodePath from 'path'
import * as babylon from 'babylon'
import Handlebars from 'handlebars'

export default handlebarsPrecompilePlugin

function handlebarsPrecompilePlugin({types: t, template}) {
  return {
    name: 'handlebars-precompile',
    visitor: {
      // WORKSHOP_START
      // put your visitor code here
      // I left the `getPrecompiledTemplate` function for you
      // to use if you want to :)
      //
      // I recommend using babel-template (which is available
      // as `template` in this babel plugin function).
      // For example:
      // const buildVariableDeclaration = template('const FOO = BAR;')
      // const variableDeclaration = buildVariableDeclaration({
      //   FOO: t.identifier('hi'),
      //   BAR: someASTNode,
      // })
      // // assume someASTNode is t.identifier('there')
      // results in: `const hi = there`
      // Tip: `getPrecompiledTemplate` returns an AST node that you
      // can use in your own buildVariableDeclaration function.
      // WORKSHOP_END
      // FINAL_START
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
      // FINAL_END
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
