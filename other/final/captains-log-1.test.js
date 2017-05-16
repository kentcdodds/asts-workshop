import pluginTester from 'babel-plugin-tester'
import captainsLog from './captains-log-1'

pluginTester({
  plugin: captainsLog,
  snapshot: true,
  tests: [
    {code: `anything.log();`, snapshot: false},
    `console.log('sup dawg')`,
  ],
})
