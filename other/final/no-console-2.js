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
        context.report({
          node,
          message: 'Using console is not allowed',
        })
      },
    }
  },
}
