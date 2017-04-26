module.exports = {
  meta: {
    docs: {
      description: 'Disallow use of console',
      category: 'Best Practices',
      recommended: true,
    },
  },
  // you're going to need context :)
  // eslint-disable-next-line no-unused-vars
  create(context) {
    return {}
  },
}
