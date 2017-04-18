export default twitterFetchToRequest

function twitterFetchToRequest(babel) {
  const {types: t} = babel

  return {
    name: 'twitter-fetch-to-request',
    visitor: {
      // FINAL_START
      ImportDeclaration(path) {
        const {node: {source: {value}}} = path
        if (value !== 'twitter') {
          return
        }
        const {namespaceSpecifier, namedSpecifiers} = splitSpecifiers(
          path.get('specifiers'),
        )
        const fetchSpecifier = namedSpecifiers.find(
          specifier => specifier.node.imported.name === 'fetch',
        )
        if (fetchSpecifier) {
          fetchSpecifier.set('imported', t.identifier('request'))
          fetchSpecifier.node.importKind = 'value'
        } else if (namespaceSpecifier) {
          const {node: {local: {name}}} = namespaceSpecifier
          const {referencePaths} = namespaceSpecifier.scope.getBinding(name)
          referencePaths.forEach(refPath => {
            const propertyPath = refPath.parentPath.get('property')
            if (propertyPath.node.name === 'fetch') {
              propertyPath.replaceWith(t.identifier('request'))
            }
          })
        }
      },
      // FINAL_END
    },
  }
  // FINAL_START

  function splitSpecifiers(specifiers) {
    return specifiers.reduce(
      (acc, specifier) => {
        if (t.isImportSpecifier(specifier)) {
          acc.namedSpecifiers.push(specifier)
        } else if (t.isImportNamespaceSpecifier(specifier)) {
          acc.namespaceSpecifier = specifier
        }
        return acc
      },
      {namedSpecifiers: []},
    )
  }
  // FINAL_END
}
