// when it's both, treat it as an ESM
module.exports = myFunction
module.exports.prop = 'some prop'
export {otherFunction}

function myFunction() {}

function otherFunction() {}
