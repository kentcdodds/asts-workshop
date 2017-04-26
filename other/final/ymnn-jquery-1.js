export default function(babel) {
  const {template} = babel

  return {
    name: 'ymnn-jquery',
    visitor: {
      CallExpression(path) {
        if (
          !deepEqual(path, {
            node: {
              callee: {name: '$'},
            },
            parentPath: {
              key: 'callee',
              node: {
                property: {
                  name: 'hide',
                },
              },
            },
          })
        ) {
          return
        }
        const overallPath = path.parentPath.parentPath
        const [el] = path.node.arguments
        const templateString = `ELEMENT.style.display = 'none';`
        const assignment = template(templateString)({
          ELEMENT: el,
        })
        overallPath.replaceWith(assignment)
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
      return isPrimitive(bVal) ? bVal === aVal : deepEqual(aVal, bVal)
    })
  )
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val)
}
