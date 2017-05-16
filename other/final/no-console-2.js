// eslint exercise 1 (no-console)
// When you're finished with this exercise, run
//   "npm start exercise.eslint.2"
//   to move on to the next exercise

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
