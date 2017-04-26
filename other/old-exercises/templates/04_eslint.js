module.exports = {
  meta: {
    docs: {
      description: 'prevent using deprecated twitter API',
      category: 'Possible Errors',
      recommended: true || false, // up to you :)
    },
    fixable: 'code',
    schema: [], // extra credit, make this take options
  },
  create(context) {
    const identifiers = new Set()
    // WORKSHOP_START
    // Leaving that ^ for you, you're welcome :)
    // You'll want to use it to keep track of
    // reference identifiers
    // WORKSHOP_END
    // FINAL_START
    return {
      ImportDeclaration(node) {
        if (node.source.value !== 'twitter') {
          return
        }
        const badImportSpecifiers = node.specifiers.filter(
          s => s.type === 'ImportSpecifier' && s.imported.name === 'fetch',
        )
        if (badImportSpecifiers.length) {
          badImportSpecifiers.forEach(badSpecifier => {
            context.report({
              node: badSpecifier,
              message: 'The twitter `fetch` API ' +
                'has been deprecated. Use `request`',
              fix(fixer) {
                return fixer.replaceText(badSpecifier, 'request')
              },
            })
          })
        } else {
          const namespaceSpecifier = node.specifiers.find(
            s => s.type === 'ImportNamespaceSpecifier',
          )
          const [variable] = context.getDeclaredVariables(namespaceSpecifier)
          if (variable) {
            variable.references.forEach(reference => {
              identifiers.add(reference.identifier)
            })
          }
        }
      },
      'Program:exit'() {
        Array.from(identifiers).forEach(identifier => {
          const {parent: {property}, parent} = identifier
          if (
            property.name === 'fetch' && parent.parent.type === 'CallExpression'
          ) {
            context.report({
              node: property,
              message: 'The twitter `fetch` API ' +
                'has been deprecated. Use `request`',
              fix(fixer) {
                return fixer.replaceText(property, 'request')
              },
            })
          }
        })
      },
    }
    // FINAL_END
  },
}
