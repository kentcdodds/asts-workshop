export default function(babel) {
  const {types: t} = babel

  return {
    name: 'ast-transform', // not required
    visitor: {
      CallExpression(path) {
        if (
          !deepEqual(path, {
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
        const start = path.node.loc.start
        path.node.arguments.unshift(
          t.stringLiteral(`${start.line}:${start.column}`),
        )
      },
    },
  }
}

function deepEqual(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey]
      const aVal = a[bKey]
      if (typeof bVal === 'function') {
        return bVal(aVal)
      }
      return isPrimative(bVal) ? bVal === aVal : deepEqual(aVal, bVal)
    })
  )
}
function isPrimative(val) {
  return val == null || /^[sbn]/.test(typeof val)
}
