import React from 'react'
import MarkdownView from 'react-markdown'

/**
 * Render a function or method signature in typescript syntax.
 */
export const FunctionSignature = ({ keyword, parameters, type, name }) => {
  return (
    <Prototype>
      {keyword && keyword + ' '}
      <strong>{name}</strong>
      ({parameters && parameters.map(p => <Parameter key={p.name} {...p}/>)}): {type.name}
    </Prototype>
  )
}

/**
 * Render a property or function parameter's name and type in typescript syntax.
 */
export const Parameter = (p) => {
  return <span>{p.name}: {<Type {...p.type} />}</span>
}

/**
 * Render a list of function parameters, along with their types and documentation.
 */
export const ParameterListDoc = ({ parameters }) => (
  <div>
    {
      parameters && parameters.length > 0 && (
        parameters.map(p => <ParameterDoc key={p.name} {...p} />)
      )
    }
  </div>
)

/**
 * Render the name, type and documentation of an individial function parameter.
 */
export const ParameterDoc = (p) => {
  return (
    <dl>
      <dt style={{ fontWeight: 'normal' }}><Prototype><Parameter {...p} /></Prototype></dt>
      <dd style={{ marginTop: '1em', marginLeft: '2em' }}>{p.comment && <MarkdownView source={p.comment.text} />}</dd>
    </dl>
  )
}

/**
 * Render a type in typescript syntax.
 */
export const Type = (p) => {
  if (p.type === 'intrinsic') {
    return <span>{p.name}</span>
  }

  return <span>???</span>
}

/**
 * Style wrapper for rendering a property or function signature.
 */
export const Prototype = ({ children }) => {
  return (
    <pre style={{ fontFamily: 'Source Code Pro, monospace', backgroundColor: 'unset', fontSize: 'inherit', fontWeight: 'inherit', margin: 0, padding: 0, display: 'inline-block' }}>
      {children}
    </pre>
  )
}
