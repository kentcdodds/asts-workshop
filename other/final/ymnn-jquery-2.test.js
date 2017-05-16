import pluginTester from 'babel-plugin-tester'
import ymnnJquery from './ymnn-jquery-2'

pluginTester({
  plugin: ymnnJquery,
  tests: [
    {code: 'foo.hide();', snapshot: false},
    {code: `$(el).hide();`, snapshot: true},

    {code: 'bar.show();', snapshot: false},
    {code: `$(el).show();`, snapshot: true},
  ],
})
