import path from 'path'
import testBabel from '../test-babel'
import captainsLog from './captains-log-4'

testBabel({
  plugin: captainsLog,
  snapshot: true,
  fixtures: path.join(__dirname, './__fixtures__'),
  tests: [
    {
      title: 'outside a function',
      code: `console.log('sup dawg')`,
      output: `console.log('1:0', 'sup dawg');`,
      snapshot: false,
    },
    `
      function add(a, b) {
        console.log(a, b)
        return a + b
      }
    `,
    `
      const multiply = (a, b) => {
        console.log(a, b)
        return a * b
      }
    `,
    `
      const divide = function(a, b) {
        console.log(a, b)
        return a / b
      }
    `,
    {fixture: 'log.js'},
    {fixture: 'log2.js'},
  ],
})
