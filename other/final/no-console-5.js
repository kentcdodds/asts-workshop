const disallowedMethods = ['log', 'info', 'warn', 'error', 'dir']

module.exports = {
  meta: {
    docs: {
      description: 'Disallow use of console',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowedMethods: {
            type: 'array',
            items: {
              enum: ['log', 'info', 'warn', 'error', 'dir'],
            },
            minItems: 1,
            uniqueItems: true,
          },
        },
      },
    ],
  },
  create(context) {
    // the next line is equivalent to the two commented following it
    // further reading: https://goo.gl/qqBVuS, https://goo.gl/PXyu7N
    const [{allowedMethods = []} = {}] = context.options
    // const config = context.options[0] || {}
    // const allowedMethods = config.allowedMethods || []
    const consoleReferences = []
    return {
      VariableDeclarator(node) {
        if (node.init.name === 'console') {
          consoleReferences.push(node.id.name)
        }
      },
      Identifier(node) {
        if (
          !looksLike(node, {
            name: val =>
              val === 'console' || consoleReferences.includes(node.name),
            parent: {
              type: 'MemberExpression',
              parent: {type: 'CallExpression'},
              property: {
                name: val =>
                  !allowedMethods.includes(val) &&
                  disallowedMethods.includes(val),
              },
            },
          })
        ) {
          return
        }
        context.report({
          node: node.parent.property,
          message: 'Using console is not allowed',
        })
      },
    }
  },
}

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey]
      const aVal = a[bKey]
      if (typeof bVal === 'function') {
        return bVal(aVal)
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal)
    })
  )
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val)
}
