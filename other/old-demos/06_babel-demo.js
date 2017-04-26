import nodePath from 'path'

const languageMap = new Map()

export default i18nPlugin

function i18nPlugin({types: t}) {
  return {
    name: 'i18n-plugin',
    visitor: {
      // FINAL_START
      Program: {
        enter(path, {file}) {
          file.set('needsMessageFormat', false)
        },
        exit({node, scope}, {file}) {
          if (
            file.get('needsMessageFormat') && !scope.hasBinding('messageFormat')
          ) {
            const messageFormatImportDeclaration = t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier('messageformat'))],
              t.stringLiteral('messageFormat'),
            )
            node.body.unshift(messageFormatImportDeclaration)
          }
        },
      },
      Identifier(path, {file, opts: {lang = 'en'}}) {
        const {node: {name: idName}} = path
        if (idName !== '__i18n__') {
          return
        }
        const args = path.parentPath.get('arguments')
        const i18nContents = getI18nContents(file.opts.filename)
        const [keyPath, {node: data} = {}] = args
        const {node: {value: key}} = keyPath
        if (data) {
          keyPath.replaceWith(t.stringLiteral(i18nContents[key]))
          path.replaceWith(t.identifier('messageFormat'))
          file.set('needsMessageFormat', true)
        } else {
          path.parentPath.replaceWith(t.stringLiteral(i18nContents[key]))
        }

        function getI18nContents(filename) {
          let languageContents = languageMap.get(lang)
          if (!languageContents) {
            languageContents = new Map()
            languageMap.set(lang, languageContents)
          }
          let contents = languageContents.get(filename)
          if (!contents) {
            const {dir, name} = nodePath.parse(filename)
            const i18nFilePath = nodePath.join(dir, 'i18n', name, `${lang}.js`)
            // eslint-disable-next-line import/no-dynamic-require
            contents = require(i18nFilePath)
            languageContents.set(filename, contents)
          }
          return contents
        }
      },
      // FINAL_END
    },
  }
}
