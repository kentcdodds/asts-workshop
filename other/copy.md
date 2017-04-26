# copy

Just some things to copy/paste

## ESLint rule-tester.js improvement

Copy this code onto line `532` of `node_modules/eslint/lib/testers/rule-tester.js`

```
if (fixResult.output !== item.output) {
  console.error('received:\n', fixResult.output, '\n\nexpected:\n', item.output, '\n\n')
}
```
