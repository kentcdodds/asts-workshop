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
      description: 'Disallow use of console',
      category: 'Best Practices',
      recommended: true,
    },
  },
  // FINAL_END
  create(context) {
    return {
      // WORKSHOP_START
      // fill this in with code :)
      // this object should have "visitor" functions
      // for each node you're interested in inspecting
      // WORKSHOP_END
      // FINAL_START
      MemberExpression(node) {
        if (node.object.name === 'console') {
          context.report({
            node,
            message: 'Using console is not allowed',
          })
        }
      },
      // FINAL_END
    }
  },
}
