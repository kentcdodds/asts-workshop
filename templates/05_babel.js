// WORKSHOP_START
// I'm giving you an empty file so you can fill it in
// from scratch. You need to define and export a function
// that returns an object with a visitor object property
//
// Good luck!
// WORKSHOP_END
// FINAL_START
export default devPlugin

function devPlugin({types: t}) {
  return {
    name: 'line-plugin',
    visitor: {
      Identifier(path) {
        const {node: {name}} = path
        if (name === '__DEV__') {
          path.replaceWith(
            t.booleanLiteral(process.env.NODE_ENV === 'development'),
          )
        }
      },
    },
  }
}
// FINAL_END
