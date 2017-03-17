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
    const identifiers = new Set()

    function report(node) {
      context.report({
        node,
        message: 'y u use bad apis?',
      })
    }

    return {
      ImportDeclaration() {},
      VariableDeclarator(node) {
        if (!isRequireCall(node.init) || node.id.type !== 'Identifier') {
          return
        }
        // Because node.id is an Identifier, always one item.
        const variable = context.getDeclaredVariables(node)[0]
        identifiers.add(variable.references[1].identifier)
      },
      'Program:exit'() {
        Array.from(identifiers).forEach(identifier => {
          if (identifier.parent.property.name === 'request') {
            report(identifier)
          }
        })
      },
    }
    function isRequireCall(callExpression) {
      return callExpression.type === 'CallExpression' &&
        callExpression.callee.name === 'require' &&
        callExpression.arguments.length === 1 &&
        callExpression.arguments[0].value === 'bucket-streams-api'
    }
  },
}
