// credit to for the original code:
// https://github.com/mvolkmann/eslint-plugin-volkmann
module.exports = {
  // WORKSHOP_START
  meta: {
    docs: {
      description: '',
      category: '',
      recommended: true || false, // up to you :)
    },
    fixable: 'code', // you need to write the fixer!
    schema: [], // extra credit, make this take options
  },
  // WORKSHOP_END
  // FINAL_START
  meta: {
    docs: {
      description: 'embrace booleans',
      category: 'Stylistic Issues',
      recommended: true,
    },
    fixable: 'code',
  },
  // FINAL_END
  create(context) {
    return {
      // FINAL_START
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
      // FINAL_END
    }
  },
}
