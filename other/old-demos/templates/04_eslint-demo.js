module.exports = {
  meta: {
    docs: {
      description: 'Disallow deprecated BucketStreams API',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
  },
  create(context) {
    // FINAL_START
    const identifiers = new Set()

    function report(node, methodName) {
      context.report({
        node,
        message: 'The `request` API has been deprecated. Use {{methodName}}',
        data: {
          methodName,
        },
      })
    }

    return {
      ImportDeclaration(node) {
        if (
          node.source.value !== 'bucket-streams-api' ||
          node.specifiers[0].type !== 'ImportDefaultSpecifier'
        ) {
          return
        }
        const variable = context.getDeclaredVariables(node.specifiers[0])[0]
        variable.references.forEach(reference => {
          identifiers.add(reference.identifier)
        })
      },
      VariableDeclarator(node) {
        if (!isRequireCall(node.init) || node.id.type !== 'Identifier') {
          return
        }
        // Because node.id is an Identifier, always one item.
        const variable = context.getDeclaredVariables(node)[0]
        variable.references.slice(1).forEach(reference => {
          identifiers.add(reference.identifier)
        })
      },
      'Program:exit'() {
        Array.from(identifiers).forEach(identifier => {
          if (identifier.parent.property.name === 'request') {
            let methodName = 'the method-specific API'
            if (identifier.parent.parent.type === 'CallExpression') {
              const {
                parent: {parent: {arguments: [{properties}]}},
              } = identifier
              const methodProperty = properties.find(p => {
                return p.key.name === 'method' && p.value.type === 'Literal'
              })
              const {value: {value} = {}} = methodProperty || {}
              if (value) {
                methodName = `\`${value.toLowerCase()}\``
              }
            }
            report(identifier.parent.property, methodName)
          }
        })
      },
    }
    function isRequireCall(callExpression) {
      return (
        callExpression.type === 'CallExpression' &&
        callExpression.callee.name === 'require' &&
        callExpression.arguments.length === 1 &&
        callExpression.arguments[0].value === 'bucket-streams-api'
      )
    }
    // FINAL_END
  },
}
