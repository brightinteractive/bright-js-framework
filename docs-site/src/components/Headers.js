import React from 'react'
import * as color from 'material-ui/styles/colors'

export const PageHeader = ({ children }) => (
  <h2 style={{ fontWeight: 400 }}>{children}</h2>
)

export const Subheader = ({ children }) => (
  <h3 style={{ fontWeight: 400, fontSize: '18px', textTransform: 'uppercase' }}>{children}</h3>
)

export function getModuleName(src) {
  const slug = JSON.parse(src)

  if (slug === 'index') {
    return 'bright-js-framework'

  } else {
    return 'bright-js-framework/' + slug.replace(/\/index$/, '')
  }
}
