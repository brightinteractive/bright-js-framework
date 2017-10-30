import React from 'react'
import { flatMap } from 'lodash'
import { Card, CardHeader, CardText, CardMedia, Table, TableHeader, TableBody, TableRow, TableRowColumn, TableHeaderColumn } from 'material-ui'
import { Comment, Prototype, FunctionSignature, ParameterListDoc, Type } from './api-documentation-components'

/**
 * Render documentation for an individual class or interface
 */
export default ({ name, comment, properties }) => {
  return (
    <Card id={`components_${name}`}>
      <CardHeader
        title={<Prototype>{'<'}<strong>{name}</strong> {'/>'}</Prototype>}
        actAsExpander={properties}
        showExpandableButton={properties}
      />
      <CardText actAsExpander={properties}>
        <Comment comment={comment} />
      </CardText>
      <CardMedia expandable={properties} style={{ paddingTop: 0 }}>
        <Table fixedHeader={false} adjustForCheckbox={false} selectable={false}>
          <TableBody displayRowCheckbox={false}>
            {
              properties && (
                <TableRow>
                  <TableHeaderColumn colSpan={2}>
                    Properties
                  </TableHeaderColumn>
                </TableRow>
              )
            }
            {
              properties && properties.map(p =>
                <TableRow key={p.name}>
                  <TableRowColumn>
                    <Prototype>{p.name}: <Type {...p.type} /></Prototype>
                  </TableRowColumn>
                  <TableRowColumn>
                    <Comment comment={p.comment} />
                  </TableRowColumn>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </CardMedia>
    </Card>
  )
}
