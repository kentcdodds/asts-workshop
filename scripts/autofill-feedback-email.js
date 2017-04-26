const fs = require('fs')
const path = require('path')

const [, , email] = process.argv

if (!email) {
  throw new Error('You must provide an email address as an argument')
}

const templateTestPath = path.resolve(__dirname, '../other/template-test.js')

const templateTestContents = fs
  .readFileSync(templateTestPath, 'utf8')
  .replace(/&em=\n/, `&em=${email}\n`)

fs.writeFileSync(templateTestPath, templateTestContents)
