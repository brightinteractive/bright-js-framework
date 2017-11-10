import React from 'react'
import { flatMap } from 'lodash'
import { Card, CardHeader, CardText, CardMedia, Table, TableHeader, TableBody, TableRow, TableRowColumn, TableHeaderColumn } from 'material-ui'
import { Comment, Prototype, FunctionSignature, ParameterListDoc, Type } from './api-documentation-components'
import { DocsTable, DocsRow, DocsSection, DocsCell } from './DocsTable'

/**
 * Render documentation for an individual class or interface
 */
export default function InterfaceDocumentation({ kind, kindString, name, children, comment, typeParameter }) {
  const properties = toArray(children).filter(x => x.kindString === 'Property')
  const methods = toArray(children).filter(x => x.kindString === 'Method')

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
        <DocsTable>
          {
            typeParameter && typeParameter.length > 0 && (
              <DocsSection span={2}>Type Parameters</DocsSection>
            )
          }
          {
            typeParameter && typeParameter.length > 0 && (
              typeParameter.map(p =>
                <DocsRow key={p.name}>
                  <DocsCell>
                    <Prototype>{p.name}: <Type {...p.type} /></Prototype>
                  </DocsCell>
                  <DocsCell multiline>
                    <Comment comment={p.comment} />
                  </DocsCell>
                </DocsRow>
              )
            )
          }
          {
            properties.length > 0 && (
              <DocsSection span={2}>Properties</DocsSection>
            )
          }
          {
            properties.map(p =>
              <DocsRow key={p.name}>
                <DocsCell>
                  <Prototype>{p.name}: <Type {...p.type} /></Prototype>
                </DocsCell>
                <DocsCell multiline>
                  <Comment comment={p.comment} />
                </DocsCell>
              </DocsRow>
            )
          }
          {
            methods.length > 0 && (
              <DocsRow>
                <TableHeaderColumn colSpan={2}>
                  Methods
                </TableHeaderColumn>
              </DocsRow>
            )
          }
          {
            flatMap(methods, method =>
              method.signatures.map((signature, i) =>
                <DocsRow key={method.name + '_' + i}>
                  <DocsCell>
                    <FunctionSignature {...signature} />
                  </DocsCell>
                  <DocsCell multiline>
                    <Comment comment={signature.comment} />
                    <ParameterListDoc key={signature.name} {...signature} />
                  </DocsCell>
                </DocsRow>
              )
            )
          }
        </DocsTable>
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

function toArray(x) {
  if (Array.isArray(x)) {
    return x
  }

  if (typeof x === 'undefined') {
    return []
  }

  return [x]
}
