# Schedule

Just something to help me make sure that I cover everything I want to in the
right order.

## Getting Started

- Introductions
  - Setup expectations
  - Go over logistics

## Why ASTs?

Go over [these slides](http://slides.com/kentcdodds/a-beginners-guide-to-asts#/3).

> NOTE: only look at the ESLint example to start!

## ESLint `no-console`

### 0

```
git diff HEAD:other/final/no-console-0.js other/final/no-console-1.js
```

- Visitor pattern
- Node Types
- `context.report`

### 1

```
git diff HEAD:other/final/no-console-1.js other/final/no-console-2.js
```

- The handy `looksLike` function
- Tip: make a `disallowedMethods` array at the top

### 2

```
git diff HEAD:other/final/no-console-2.js other/final/no-console-3.js
```

- The ESLint [`schema`](http://eslint.org/docs/developer-guide/working-with-rules#options-schemas)
- How to get options from the schema

### 3

- Issues with scope
- `context.getDeclaredVariables(variableDeclarator)[0].references.slice(1)`
(returns an array because you can provide it a `VariableDeclaration` which could
  have multiple declarators. Because we're giving it a single declarator, it will
  always return an array of one item).
  - `findParent` helper for finding the variable declarator

```
git diff HEAD:other/final/no-console-3.js other/final/no-console-4.js
```

### 4

- The `fix` function
- Requires `fixable` in the `meta` property
- Update the ESLint code so you can see the diff in your fixer. See `copy.md`

```
git diff HEAD:other/final/no-console-4.js other/final/no-console-5.js
```

## Babel `captains-log`

> Don't forget to give the ASTs demo and talk about the differences in the API
> like path instead of node etc.

### 0

- Manipulation of the AST is just like manipulation of regular JS objects
- Creating new nodes with [`babel.types`](http://babeljs.io/docs/core-packages/babel-types/)

```
git diff HEAD:other/final/captains-log-0.js other/final/captains-log-1.js
```

### 1

- `path.findParent` + `babel.types` helpers

```
git diff HEAD:other/final/captains-log-1.js other/final/captains-log-2.js
```

### 2

- Not much different here. Just refactor to handle the new reqiurements

```
git diff HEAD:other/final/captains-log-2.js other/final/captains-log-3.js
```

### 3

- Same, not a whole lot new here

```
git diff HEAD:other/final/captains-log-3.js other/final/captains-log-4.js
```

## Codemod `ymnn-jquery`

> Don't forget to give the ASTs demo and talk about the differences in use cases

### 0

- `babel.template`

```javascript
const templateString = `FOO.bar.BAZ(ONE, TWO)`
const callExpression = template(templateString)({
  FOO: t.identifier('someFoo'),
  BAZ: t.identifier('otherBaz'),
  ONE: t.numericLiteral(1),
  TWO: t.numericLiteral(2),
})
path.replaceWith(callExpression)
```

```
git diff HEAD:other/final/ymnn-jquery-0.js other/final/ymnn-jquery-1.js
```

### 1

- Tip: Create a string literal with `t.stringLiteral`

```
git diff HEAD:other/final/ymnn-jquery-1.js other/final/ymnn-jquery-2.js
```

### 2

- Not a ton here, mostly refactoring to handle another case.

```
git diff HEAD:other/final/ymnn-jquery-2.js other/final/ymnn-jquery-3.js
```

### 3

- This one's exciting. Talk again about how not all the bindings have been
  established yet so we need to store things locally for our file. in a `Set`.
  Then when the program exits, we can go through and make our modifications.
- `declaratorPath.scope.getBinding(declaratorPath.node.id.name)` then iterate on
  the `binding.referencePaths`, from there it's pretty much just making new
  functions and reusing things.

```
git diff HEAD:other/final/ymnn-jquery-3.js other/final/ymnn-jquery-4.js
```
