import pluginTester from 'babel-plugin-tester'
import ymnnJquery from './ymnn-jquery-4'

pluginTester({
  plugin: ymnnJquery,
  tests: [
    {code: 'foo.hide();', snapshot: false},
    {code: `$(el).hide();`, snapshot: true},

    {code: 'bar.show();', snapshot: false},
    {code: `$(el).show();`, snapshot: true},

    {code: `foo.addClass(otherClassThing);`, snapshot: false},
    {code: `$(el).addClass(className);`, snapshot: true},

    {
      code: `
        var myEl = $(el);
        myEl.addClass(someClassname);
      `,
      snapshot: true,
    },
    {
      code: `
        var myOtherEl = $(someEl);
        myOtherEl.unsupportedFunction();
      `,
      snapshot: false,
    },
  ],
})
