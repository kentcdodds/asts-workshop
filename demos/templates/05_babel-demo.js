// WORKSHOP_START
// TODO replace __line__ with the actual line
// WORKSHOP_END
// FINAL_START
export default linePlugin

function linePlugin({types: t}) {
  return {
    name: 'line-plugin',
    visitor: {
      Identifier(path) {
        const {node: {name, loc: {start: {line}}}} = path
        if (name === '__line__') {
          path.replaceWith(t.expressionStatement(t.numericLiteral(line)))
        }
      },
    },
  }
}
// FINAL_END
