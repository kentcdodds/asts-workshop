import nodePath from 'path'

const languageMap = new Map()

export default i18nPlugin

function i18nPlugin({types: t}) {
  return {
    name: 'i18n-plugin',
    visitor: {},
  }
}
