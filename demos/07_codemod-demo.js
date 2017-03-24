export default jQueryHidePlugin

function jQueryHidePlugin(babel) {
  const {template} = babel
  return {
    name: 'jquery-hide',
    visitor: {
      CallExpression(path) {
        if (path.node.callee.name !== '$' || path.parentPath.key !== 'callee') {
          return
        }
        const overallPath = path.parentPath.parentPath
        const [el] = path.node.arguments
        const templateString = `ELEMENT.style.display = 'hide';`
        const assignment = template(templateString)({
          ELEMENT: el,
        })
        overallPath.replaceWith(assignment)
      },
    },
  }
}
