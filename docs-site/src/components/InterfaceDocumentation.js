import React from 'react'
import { flatMap } from 'lodash'
import { Card, CardHeader, CardText, CardMedia, Table, TableHeader, TableBody, TableRow, TableRowColumn, TableHeaderColumn } from 'material-ui'
import { Comment, Prototype, FunctionSignature, ParameterListDoc, Type } from './api-documentation-components'

/**
 * Render documentation for an individual class or interface
 */
export default ({ kind, kindString, name, children, comment, typeParameter }) => {
  const properties = children.filter(x => x.kindString === 'Property')
  const methods = children.filter(x => x.kindString === 'Method')

  return (
    <Card id={`interfaces_${name}`}>
      <CardHeader
        title={<Prototype><InterfaceDecl kindString={kindString} name={name} typeParameter={typeParameter} /></Prototype>}
        actAsExpander
        showExpandableButton
      />
      <CardText actAsExpander>
        <Comment comment={comment} />
      </CardText>
      <CardMedia expandable style={{ paddingTop: 0 }}>
        <Table fixedHeader={false} adjustForCheckbox={false} selectable={false}>
          <TableBody displayRowCheckbox={false}>
            {
              typeParameter && typeParameter.length > 0 && (
                <TableRow>
                  <TableHeaderColumn colSpan={2}>
                    Type Parameters
                  </TableHeaderColumn>
                </TableRow>
              )
            }
            {
              typeParameter && typeParameter.map(p =>
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
            {
              properties.length > 0 && (
                <TableRow>
                  <TableHeaderColumn colSpan={2}>
                    Properties
                  </TableHeaderColumn>
                </TableRow>
              )
            }
            {
              properties.map(p =>
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
            {
              methods.length > 0 && (
              <TableRow>
                <TableHeaderColumn colSpan={2}>
                  Methods
                </TableHeaderColumn>
              </TableRow>
              )
            }
            {
              flatMap(methods, method =>
                method.signatures.map((signature, i) =>
                  <TableRow key={method.name + '_' + i}>
                    <TableRowColumn>
                      <FunctionSignature {...signature} />
                    </TableRowColumn>
                    <TableRowColumn>
                      <Comment comment={signature.comment} />
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

function InterfaceDecl({ kindString, name, typeParameter }) {
  return (
    <span>
      {kindString.toLowerCase()} <strong>{name}</strong>
      {
        typeParameter && typeParameter.length > 0 && (
          <span>
            {'<'}{typeParameter.map(({ name }) => name).join(', ')}{'>'}
          </span>
        )
      }
    </span>
  )
}
