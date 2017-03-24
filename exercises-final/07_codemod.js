export default jQueryAddClassPlugin

function jQueryAddClassPlugin(babel) {
  const {template} = babel
  return {
    name: 'jquery-add-class',
    visitor: {
      CallExpression(path) {
        if (
          path.node.callee.name !== '$' ||
          path.parentPath.key !== 'callee' ||
          path.parentPath.node.property.name !== 'addClass'
        ) {
          return
        }
        const overallPath = path.parentPath.parentPath
        const [el] = path.node.arguments
        const templateString = `ELEMENT.classList.add(CLASS_NAME);`
        const assignment = template(templateString)({
          ELEMENT: el,
          CLASS_NAME: overallPath.node.arguments,
        })
        overallPath.replaceWith(assignment)
      },
    },
  }
}
