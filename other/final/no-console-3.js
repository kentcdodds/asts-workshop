const disallowedMethods = ['log', 'info', 'warn', 'error', 'dir']

module.exports = {
  meta: {
    docs: {
      description: 'Disallow use of console',
      category: 'Best Practices',
      recommended: true,
    },
  },
  create(context) {
    return {
      'CallExpression > MemberExpression > Identifier[name="console"]'(node) {
        if (
          !looksLike(node, {
            parent: {
              property: {
                name: val => disallowedMethods.includes(val),
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
