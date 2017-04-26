export default function(babel) {
  const {template, types: t} = babel

  return {
    name: 'ymnn-jquery',
    visitor: {
      Program: {
        enter(path, {file}) {
          file.set('assignedJQueryEls', new Set())
        },
        exit(path, {file}) {
          const jQueryElVariableDeclarators = file.get('assignedJQueryEls')
          Array.from(
            jQueryElVariableDeclarators,
          ).forEach(assignedCallExpression => {
            const declaratorPath = assignedCallExpression.parentPath
            const binding = declaratorPath.scope.getBinding(
              declaratorPath.node.id.name,
            )
            binding.referencePaths.forEach(referencePath => {
              if (
                looksLike(referencePath, {
                  parentPath: {
                    type: 'MemberExpression',
                    parentPath: {
                      type: 'CallExpression',
                    },
                  },
                })
              ) {
                if (!isSupportedJQueryFunctionCall(referencePath.parentPath)) {
                  return
                }
                const [el] = assignedCallExpression.node.arguments
                handleSupportedJQueryFunctionCall(
                  el,
                  referencePath.parent.property.name,
                  referencePath.parentPath.parentPath,
                )
                declaratorPath.remove()
              }
            })
          })
        },
      },
      CallExpression(path, {file}) {
        if (
          !looksLike(path, {
            node: {
              callee: {name: '$'},
            },
          })
        ) {
          return
        }
        if (!isSupportedJQueryFunctionCall(path.parentPath)) {
          if (t.isVariableDeclarator(path.parentPath)) {
            file.get('assignedJQueryEls').add(path)
          }
          return
        }
        const jqueryFunction = path.parentPath.node.property.name
        const pathToReplace = path.parentPath.parentPath
        const [el] = path.node.arguments
        handleSupportedJQueryFunctionCall(el, jqueryFunction, pathToReplace)
      },
    },
  }

  function handleSupportedJQueryFunctionCall(
    el,
    jqueryFunction,
    pathToReplace,
  ) {
    if (jqueryFunction === 'addClass') {
      updateAddClass(el, pathToReplace)
    } else {
      updateDisplay(el, pathToReplace, jqueryFunction)
    }
  }

  function updateDisplay(el, pathToReplace, jqueryFunction) {
    const templateString = `ELEMENT.style.display = DISPLAY;`
    const assignment = template(templateString)({
      ELEMENT: el,
      DISPLAY: t.stringLiteral(jqueryFunction === 'show' ? '' : 'none'),
    })
    pathToReplace.replaceWith(assignment)
  }

  function updateAddClass(el, pathToReplace) {
    const templateString = `ELEMENT.classList.add(CLASS_NAME);`
    const assignment = template(templateString)({
      ELEMENT: el,
      CLASS_NAME: pathToReplace.node.arguments,
    })
    pathToReplace.replaceWith(assignment)
  }
}

function isSupportedJQueryFunctionCall(memberExpression) {
  return looksLike(memberExpression, {
    key: 'callee',
    node: {
      property: {
        name: val => ['hide', 'show', 'addClass'].includes(val),
      },
    },
  })
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
