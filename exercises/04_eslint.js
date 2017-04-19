module.exports = {
  meta: {
    docs: {
      description: 'prevent using deprecated twitter API',
      category: 'Possible Errors',
      recommended: true || false, // up to you :)
    },
    fixable: 'code',
    schema: [], // extra credit, make this take options
  },
  create(context) {
    const identifiers = new Set()
    // Leaving that ^ for you, you're welcome :)
    // You'll want to use it to keep track of
    // reference identifiers
  },
}
