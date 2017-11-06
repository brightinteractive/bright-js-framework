import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui'
import { Subheader } from './Headers'
import { Comment, FunctionSignature, ParameterListDoc, Type } from './api-documentation-components'

/**
 * Render documentation for each signature of a free function
 */
const FunctionDocumentation = ({ name, signatures, Divider, decorator }) => {
  return (
    <div id={`interfaces_${name}`}>
      {signatures.map((s, i) => <FunctionSignatureDoc key={i} decorator={decorator} {...s} />)}
    </div>
  )
}

export default FunctionDocumentation

/**
 * Render documentation for a single signature of a free function
 */
export const FunctionSignatureDoc = (props) => (
  <Card>
    <CardHeader title={<FunctionSignature keyword={!props.decorator && "function"} {...props} />} actAsExpander showExpandableButton />
    <CardText actAsExpander>
      <Comment short comment={props.comment} />
    </CardText>
    <CardText expandable>
      <Comment extended comment={props.comment} />
    </CardText>
    {
      props.parameters && props.parameters.length > 0 && (
        <CardText expandable>
          <Subheader>Parameters</Subheader>
          <ParameterListDoc {...props} />
        </CardText>
      )
    }
  </Card>
)
