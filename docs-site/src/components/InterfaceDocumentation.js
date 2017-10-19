import React from 'react'
import MarkdownView from 'react-markdown'
import { flatMap } from 'lodash'
import { Card, CardHeader, CardText, CardMedia, Table, TableHeader, TableBody, TableRow, TableRowColumn, TableHeaderColumn } from 'material-ui'
import { Prototype, FunctionSignature, ParameterListDoc, Type } from './api-documentation-components'

/**
 * Render documentation for an individual class or interface
 */
export default ({ kind, kindString, name, children, comment }) => {
  const properties = children.filter(x => x.kindString === 'Property')
  const methods = children.filter(x => x.kindString === 'Method')

  return (
    <Card id={`interfaces_${name}`}>
      <CardHeader
        title={<Prototype>{kindString.toLowerCase()} <strong>{name}</strong></Prototype>}
        actAsExpander
        showExpandableButton
      />
      <CardText actAsExpander>
        <MarkdownView source={comment.shortText} />
      </CardText>
      <CardMedia expandable style={{ paddingTop: 0 }}>
        <Table fixedHeader={false} adjustForCheckbox={false} selectable={false}>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableHeaderColumn colSpan={2}>
                Properties
              </TableHeaderColumn>
            </TableRow>
            {
              properties.map(p =>
                <TableRow key={p.name}>
                  <TableRowColumn>
                    <Prototype>{p.name}: <Type {...p.type} /></Prototype>
                  </TableRowColumn>
                  <TableRowColumn>
                    <MarkdownView source={p.comment.shortText} />
                  </TableRowColumn>
                </TableRow>
              )
            }
            <TableRow>
              <TableHeaderColumn colSpan={2}>
                Methods
              </TableHeaderColumn>
            </TableRow>
            {
              flatMap(methods, method =>
                method.signatures.map((signature, i) =>
                  <TableRow key={method.name + '_' + i}>
                    <TableRowColumn>
                      <FunctionSignature {...signature} />
                    </TableRowColumn>
                    <TableRowColumn>
                      <MarkdownView source={signature.comment.shortText} />
                      <ParameterListDoc key={signature.name} {...signature} />
                    </TableRowColumn>
                  </TableRow>
                )
              )
            }
          </TableBody>
        </Table>
      </CardMedia>
    </Card>
  )
}
