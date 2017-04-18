module.exports = {
  meta: {
    docs: {
      description: 'Disallow use of alert',
      category: 'Best Practices',
      recommended: true,
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.name === 'alert') {
          context.report({
            node,
            message: 'Using alert is not allowed',
          })
        }
      },
    }
  },
}
