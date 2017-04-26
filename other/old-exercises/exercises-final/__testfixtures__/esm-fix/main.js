import fs from 'fs'
import {resolve} from 'path'
import isAbsolute, {theAnswer} from './cjs'
import * as cjs2 from './cjs2'
import myFunction, {someProp, otherFunction} from './both'
import {foo} from './esm'
import * as esm2 from './esm2'
import defaultExport from './default-esm'

function doThings(withThing) {
  if (foo()) {
    const resolve = 'I am not the resolve function!'
    return fs.writeFileSync('./foo.ignored.txt', resolve)
  } else if (defaultExport() && isAbsolute(withThing)) {
    const foo = 'not the foo function'
    return myFunction(resolve(foo, someProp), otherFunction)
  } else if (cjs2.foobar()) {
    return cjs2.baz.buzz
  } else if (esm2.default) {
    return {foo: esm2.foo}
  }
  return theAnswer
}

doThings('/blah/blah')
