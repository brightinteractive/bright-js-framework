import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui'

export const Section = ({ title, children, alwaysExpanded }) => (
  <Card style={{ marginBottom: '1em' }}>
    <CardHeader showExpandableButton={!alwaysExpanded} actAsExpander={!alwaysExpanded} title={title} />
    <CardText expandable={!alwaysExpanded}>
      {children}
    </CardText>
  </Card>
)
