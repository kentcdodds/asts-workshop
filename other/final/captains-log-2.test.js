import pluginTester from 'babel-plugin-tester'
import captainsLog from './captains-log-2'

pluginTester({
  plugin: captainsLog,
  snapshot: true,
  tests: [
    {code: `anything.log();`, snapshot: false},
    `console.log('sup dawg')`,
    `
      function add(a, b) {
        console.log(a, b)
        return a + b
      }
    `,
  ],
})
