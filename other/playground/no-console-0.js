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
      Identifier(node) {
        if (node.name === 'console') {
          context.report({
            node,
            message: 'Using console is not allowed',
          })
        }
      },
    }
  },
}
