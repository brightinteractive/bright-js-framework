import React from 'react'
import MarkdownView from 'react-markdown'
import { Card, CardHeader, CardText } from 'material-ui'
import { FunctionSignature, ParameterListDoc, Type } from './api-documentation-components'

/**
 * Render documentation for each signature of a free function
 */
const FunctionDocumentation = ({ name, signatures, Divider }) => {
  return (
    <div id={`interfaces_${name}`}>
      {signatures.map((s, i) => <FunctionSignatureDoc key={i} {...s} />)}
    </div>
  )
}

export default FunctionDocumentation

/**
 * Render documentation for a single signature of a free function
 */
export const FunctionSignatureDoc = (props) => (
  <Card>
    <CardHeader title={<FunctionSignature keyword="function" {...props} />} actAsExpander showExpandableButton />
    <CardText actAsExpander>
      <MarkdownView source={props.comment.shortText} />
    </CardText>
    <CardText expandable>
      <ParameterListDoc {...props} />
    </CardText>
  </Card>
)
