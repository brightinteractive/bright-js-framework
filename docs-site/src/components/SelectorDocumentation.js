import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui'
import { Subheader } from './Headers'
import { Comment, Prototype, ParameterListDoc, Type } from './api-documentation-components'

/**
 * Render documentation for a selector
 */
const SelectorDocumentation = ({ name, comment, type }) => {
  const returns = type.typeArguments[0]
  return (
    <Card>
      <CardHeader title={<Prototype>@select(<strong>{name}</strong>)</Prototype>} actAsExpander />
      <CardText actAsExpander>
        <Prototype>StateSelection{'<'}<Type {...returns} />{'>'}</Prototype>
      </CardText>
      <CardText actAsExpander>
        <Comment short comment={comment} />
      </CardText>
      <CardText expandable>
        <Comment extended comment={comment} />
      </CardText>
      <CardText expandable>
      </CardText>
    </Card>
  )
}

export default SelectorDocumentation
