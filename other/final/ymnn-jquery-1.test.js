import pluginTester from 'babel-plugin-tester'
import ymnnJquery from './ymnn-jquery-1'

pluginTester({
  plugin: ymnnJquery,
  tests: [
    {code: 'foo.hide();', snapshot: false},
    {code: `$(el).hide();`, snapshot: true},
  ],
})
