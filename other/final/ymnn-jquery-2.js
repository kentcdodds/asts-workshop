export default function(babel) {
  const {template, types: t} = babel

  return {
    name: 'ymnn-jquery',
    visitor: {
      CallExpression(path) {
        if (
          !looksLike(path, {
            node: {
              callee: {name: '$'},
            },
            parentPath: {
              key: 'callee',
              node: {
                property: {
                  name: val => ['hide', 'show'].includes(val),
                },
              },
            },
          })
        ) {
          return
        }
        const jqueryFunction = path.parentPath.node.property.name
        const overallPath = path.parentPath.parentPath
        const [el] = path.node.arguments
        const templateString = `ELEMENT.style.display = DISPLAY;`
        const assignment = template(templateString)({
          ELEMENT: el,
          DISPLAY: t.stringLiteral(jqueryFunction === 'show' ? '' : 'none'),
        })
        overallPath.replaceWith(assignment)
      },
    },
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
