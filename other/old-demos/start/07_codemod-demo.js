export default jQueryHidePlugin

function jQueryHidePlugin(babel) {
  const {template} = babel
  return {
    name: 'jquery-hide',
    visitor: {},
  }
}
