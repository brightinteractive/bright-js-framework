import React from 'react'
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/light'
import bash from 'react-syntax-highlighter/dist/languages/bash'
import typescript from 'react-syntax-highlighter/dist/languages/typescript'
import { docco } from 'react-syntax-highlighter/dist/styles'

registerLanguage('typescript', typescript)
registerLanguage('bash', bash)

export const CodeBlock = ({ language = 'typescript', children }) => (
  <SyntaxHighlighter language={language} style={docco}>
    {React.Children.toArray(children).join('')}
  </SyntaxHighlighter>
)

export const CodeFile = ({ path, ...props }) => (
  <div style={{ border: '1px solid darkgrey' }}>
    <div style={{ fontSize: 12, backgroundColor: 'darkgrey', color: 'white', padding: '0.25em' }}>{path}</div>
    <CodeBlock {...props} />
  </div>
)
