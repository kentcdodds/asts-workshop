module.exports = {
  meta: {
    docs: {
      description: 'Disallow blockless if statements',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    const sourceCode = context.getSourceCode()
    return {
      IfStatement(node) {
        if (!isBlockOrIfStatement(node.consequent)) {
          context.report({
            node,
            message: 'Block expected in consequent',
            fix: getFix(node.consequent),
          })
        }
        if (!isBlockOrIfStatement(node.alternate)) {
          context.report({
            node,
            message: 'Block expected in alternate',
            fix: getFix(node.alternate),
          })
        }
      },
    }
    function getFix(nodeToFix) {
      return fixer => {
        return fixer.replaceText(
          nodeToFix,
          `{${sourceCode.getText(nodeToFix)}}`,
        )
      }
    }
  },
}

function isBlockOrIfStatement(node) {
  return !node || node.type === 'BlockStatement' || node.type === 'IfStatement'
}
