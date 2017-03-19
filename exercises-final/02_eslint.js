// credit to for the original code:
// https://github.com/mvolkmann/eslint-plugin-volkmann
module.exports = {
  meta: {
    docs: {
      description: 'embrace booleans',
      category: 'Stylistic Issues',
      recommended: true,
    },
    fixable: 'code',
    schema: [], // no options
  },
  create(context) {
    return {
      ConditionalExpression(node) {
        const consequent = node.consequent.raw
        const alternate = node.alternate.raw
        const boolTrue = consequent === 'true' && alternate === 'false'
        const boolFalse = consequent === 'false' && alternate === 'true'
        if (boolTrue || boolFalse) {
          const sourceCode = context.getSourceCode()
          const testCode = sourceCode.getText(node.test)
          let usage = `Boolean(${testCode})`
          if (boolFalse) {
            usage = `!${usage}`
          }
          context.report({
            node,
            message: 'Unnecessary ternary; Use {{usage}} instead',
            data: {
              usage,
            },
            fix(fixer) {
              // This fix is too verbose.
              // You might prefer to manually fix the code.
              return fixer.replaceText(node, usage)
            },
          })
        }
      },
    }
  },
}
