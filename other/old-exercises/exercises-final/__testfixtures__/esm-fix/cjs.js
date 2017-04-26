// imports are totally ok and should not throw off the plugin.
// This is a CommonJS exported module
import path from 'path'

module.exports = path.isAbsolute
module.exports.theAnswer = () => 42
