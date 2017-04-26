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
-
