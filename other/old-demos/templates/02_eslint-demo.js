module.exports = {
  meta: {
    docs: {
      description: 'no-unnecessary-ternary',
      category: 'Stylistic',
      recommended: true,
    },
    // FINAL_START
    fixable: 'code',
    // FINAL_END
  },
  create(context) {
    // FINAL_START
    const sourceCode = context.getSourceCode()
    return {
      ConditionalExpression(node) {
        const isNeccessary =
          node.consequent.type !== 'Literal' || node.consequent.value !== true
        if (isNeccessary) {
          return
        }
        context.report({
          node,
          message: 'Simplify ternary to logical expression',
          fix(fixer) {
            return fixer.replaceText(
              node,
              `Boolean(${sourceCode.getText(node.test)})` +
                ` || ${sourceCode.getText(node.alternate)}`,
            )
          },
        })
      },
    }
    // FINAL_END
  },
}
