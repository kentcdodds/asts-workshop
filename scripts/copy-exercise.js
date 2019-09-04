const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const stripIndent = require('strip-indent')
const fileExists = require('file-exists')
const {oneLine} = require('common-tags')

const [, , name, number, scriptName] = process.argv

const finalDir = path.resolve(__dirname, '../other/final')
const exercisesDir = path.resolve(__dirname, '../exercises')
rimraf.sync(exercisesDir)
mkdirp.sync(exercisesDir)

const testNumber = (Number(number) + 1).toString()
const finalPath = path.join(finalDir, `${name}-${number}.js`)
const finalTestFilename = `${name}-${testNumber}.test.js`
const finalTestPath = path.join(finalDir, finalTestFilename)
const finalSnapshotPath = path.join(
  finalDir,
  `__snapshots__/${finalTestFilename}.snap`
)
const exerciseTestPath = path.join(exercisesDir, `${name}.test.js`)
const exercisePath = path.join(exercisesDir, `${name}.js`)

const finalContents = fs.readFileSync(finalPath, 'utf8')
const banner = stripIndent(
  `
    // ${scriptName} exercise ${number} (${name})
    // When you're finished with this exercise, run
    //   "npm start exercise.${scriptName}.${testNumber}"
    //   to move on to the next exercise
  `
).trim()

const footer = fs
  .readFileSync(path.resolve(__dirname, '../other/template-test.js'), 'utf8')
  .replace(/&e=/, `&e=${scriptName}%20exercise%20${testNumber}`)

const testExists = fileExists.sync(finalTestPath)
if (testExists) {
  const finalTestContents = fs
    .readFileSync(finalTestPath, 'utf8')
    .replace(new RegExp(`${name}-${testNumber}`, 'g'), name)
  fs.writeFileSync(
    exerciseTestPath,
    `${banner}\n\n${finalTestContents}\n\n${footer}`
  )
}

const finalExists = fileExists.sync(finalPath)
if (finalExists) {
  fs.writeFileSync(exercisePath, `${banner}\n\n${finalContents}`)
}

const snapshotExists = fileExists.sync(finalSnapshotPath)
if (snapshotExists) {
  mkdirp.sync(path.join(exercisesDir, '__snapshots__'))
  const snapshotContents = fs.readFileSync(finalSnapshotPath, 'utf8')
  const exerciseSnapshotPath = path.join(
    exercisesDir,
    `__snapshots__/${name}.test.js.snap`
  )
  fs.writeFileSync(exerciseSnapshotPath, snapshotContents)
}

if (!finalExists) {
  console.log(
    oneLine`
      There is no exercise ${number} for ${scriptName}.
    `
  )
} else if (!testExists) {
  console.log(
    oneLine`
      You've reached the end of the ${scriptName} exercises!
    `
  )
} else if (finalExists && testExists) {
  console.log(
    oneLine`
      You are now on exercise ${number} of ${scriptName}.
      Open "./exercises/${name}.js" and "./exercises/${name}.test.js"
      and run "npm start" to get started!
    `
  )
}

// this is not transpiled
/*
  eslint
  no-console: 0,
  comma-dangle: [
    2,
    {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      functions: 'never'
    }
  ]
 */
