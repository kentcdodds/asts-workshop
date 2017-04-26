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
