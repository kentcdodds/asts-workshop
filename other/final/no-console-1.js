module.exports = {
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
