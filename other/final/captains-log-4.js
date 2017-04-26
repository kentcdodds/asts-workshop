export default function(babel) {
  const {types: t} = babel

  return {
    name: 'captains-log',
    visitor: {
      CallExpression(path) {
        if (
          !looksLike(path, {
            node: {
              callee: {
                type: 'MemberExpression',
                object: {
                  name: 'console',
                },
              },
            },
          })
        ) {
          return
        }
        let prefix = ''
        const functionName = getFunctionName(path)
        if (functionName) {
          prefix += functionName
        }
        const start = path.node.loc.start
        prefix += ` ${start.line}:${start.column}`
        path.node.arguments.unshift(t.stringLiteral(prefix.trim()))
      },
    },
  }

  function getFunctionName(path) {
    const parentFunction = path.findParent(parent => {
      return (
        t.isFunctionDeclaration(parent) ||
        t.isArrowFunctionExpression(parent) ||
        t.isFunctionExpression(parent)
      )
    })
    if (!parentFunction) {
      return null
    }
    if (looksLike(parentFunction, {node: {id: t.isIdentifier}})) {
      return parentFunction.node.id.name
    } else if (
      t.isVariableDeclarator(parentFunction.parent) ||
      t.isFunctionExpression(parentFunction.parent)
    ) {
      return parentFunction.parent.id.name
    }
    return null
  }
}

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey]
      const aVal = a[bKey]
      if (typeof bVal === 'function') {
        return bVal(aVal)
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal)
    })
  )
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val)
}
