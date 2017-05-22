module.exports = {
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
