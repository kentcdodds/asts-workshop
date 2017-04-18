import React from 'react'

export default MyInternationlizedApp

function MyInternationlizedApp({name}) {
  return (
    <div>
      <h1>{__i18n__('title')}</h1>
      <div>{__i18n__('subtitle')}</div>
      <div>{__i18n__('greeting', {name})}</div>
    </div>
  )
}
