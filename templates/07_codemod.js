// WORKSHOP_START
// I'm giving you an empty file so you can fill it in
// from scratch. You need to define and export a function
// that returns an object with a visitor object property
//
// Good luck!
// WORKSHOP_END
// FINAL_START
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
// FINAL_END
