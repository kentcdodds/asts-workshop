module.exports = {
  meta: {
    docs: {
      description: 'Disallow blockless switch cases',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    // FINAL_START
    const sourceCode = context.getSourceCode()
    return {
      SwitchCase(node) {
        if (isBlockStatement(node.consequent[0])) {
          return
        }
        context.report({
          node,
          message: 'Switch cases should use a block',
          fix: fixer => {
            const [first] = node.consequent
            const [last] = node.consequent.slice(-1)
            const range = [first.range[0], last.range[1]]
            const consequentSource = node.consequent
              .map(c => sourceCode.getText(c))
              .join('\n')
            return fixer.replaceTextRange(range, `{${consequentSource}}`)
          },
        })

        function isBlockStatement(n) {
          return n.type === 'BlockStatement'
        }
      },
    }
    // FINAL_END
  },
}
