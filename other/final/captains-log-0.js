/* eslint no-unused-vars:0 */

export default function(babel) {
  // I'm leavning this here for you because it's handy :)
  const {types: t} = babel

  return {
    name: 'captains-log',
    visitor: {},
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
