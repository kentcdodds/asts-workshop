var path = require('path')
var installDeps = require('./workshop-setup').installDeps

var main = path.resolve('..')
installDeps(main).catch(() => {
  // ignore, workshop-setup will log for us...
})
