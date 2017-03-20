// credit to for the original code:
// https://github.com/mvolkmann/eslint-plugin-volkmann
module.exports = {
  meta: {
    docs: {
      description: '',
      category: '',
      recommended: true || false, // up to you :)
    },
    fixable: 'code', // you need to write the fixer!
    schema: [], // extra credit, make this take options
  },
  create(context) {
    return {}
  },
}
