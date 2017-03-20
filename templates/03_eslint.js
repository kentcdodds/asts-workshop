module.exports = {
  // WORKSHOP_START
  meta: {
    docs: {
      description: '',
      category: '',
      recommended: true || false, // up to you :)
    },
    fixable: '',
    schema: [], // extra credit, make this take options
  },
  // WORKSHOP_END
  // FINAL_START
  meta: {
    docs: {
      description: 'Disallow blockless if statements',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
  },
  // FINAL_END
  create(context) {
    // FINAL_START
    const sourceCode = context.getSourceCode()
    // FINAL_END
    return {
      // FINAL_START
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
      // FINAL_END
    }
    // FINAL_START
    function getFix(nodeToFix) {
      return fixer => {
        return fixer.replaceText(
          nodeToFix,
          `{${sourceCode.getText(nodeToFix)}}`,
        )
      }
    }
    // FINAL_END
  },
}

// FINAL_START
function isBlockOrIfStatement(node) {
  return !node || node.type === 'BlockStatement' || node.type === 'IfStatement'
}
// FINAL_END
