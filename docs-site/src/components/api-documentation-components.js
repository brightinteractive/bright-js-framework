import React from 'react'
import MarkdownView from 'react-markdown'

/**
 * Render a function or method signature in typescript syntax.
 */
export const FunctionSignature = ({ keyword, parameters, type, name, decorator }) => {
  return (
    <Prototype>
      {decorator && '@'}
      {keyword && keyword + ' '}
      <strong>{name}</strong>
      ({parameters && parameters.map(p => <Parameter key={p.name} {...p}/>)}){!decorator && ': ' + type.name}
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
      <dd style={{ marginTop: '1em', marginLeft: '2em' }}><Comment comment={p.comment} /></dd>
    </dl>
  )
}

/**
 * Render a type in typescript syntax.
 */
export const Type = (p) => {
  if (!p.type) {
    return <span>any</span>
  }
  if (p.type === 'intrinsic') {
    return <span>{p.name}</span>
  }
  if (p.type === 'reference') {
    return (
      <span>
        {p.name}<GenericParamList params={p.typeArguments} />
      </span>
    )
  }
  if (p.type === 'union') {
    return <Delimited delimiter=" | ">{p.types.map((t, i) => <Type key={i} {...t} />)}</Delimited>
  }
  if (p.type === 'typeParameter') {
    return <span>{p.name}</span>
  }

  return <span>???</span>
}

export const GenericParamList = ({ params }) => {
  if (!params || params.length === 0) {
    return null
  }

  return (
    <span>
      {'<'}<Delimited delimiter=", ">{params.map((p, i)=> <Type key={i} {...p} />)}</Delimited>{'>'}
    </span>
  )
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

/**
 * Documentation extracted from a comment field.
 */
export const Comment = ({ comment, short, extended }) => {
  if (!comment) {
    return null
  }

  return (
    <MarkdownView
      source={
        (comment.shortText && !extended ? comment.shortText : '')
        + (comment.text && !short ? '\n\n' + comment.text : '')
      }
    />
  )
}

export const Delimited = ({ delimiter, children }) => {
  if (React.Children.count(children) === 0) {
    return null
  }

  const [first, ...rest] = React.Children.toArray(children)

    return (
      <span>
        {first}{rest.map((c, i) => <span key={i}>{delimiter}{c}</span>)}
      </span>
    )
}
