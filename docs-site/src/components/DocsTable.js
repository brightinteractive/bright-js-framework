import React from 'react'
import { Table, TableHeader, TableBody, TableRow, TableRowColumn, TableHeaderColumn } from 'material-ui'

export function DocsTable({ columns, children }) {
  return (
    <Table style={{ tableLayout: 'auto' }} selectable={false} fixedHeader={false}>
      {
        columns && (
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {
                columns.map((col) => <TableHeaderColumn colSpan={span} key={col}>{col}</TableHeaderColumn>)
              }
            </TableRow>
          </TableHeader>
        )
      }
      <TableBody displayRowCheckbox={false}>
        {children}
      </TableBody>
    </Table>
  )
}

export function DocsSection({ span, children }) {
  return <TableHeaderColumn colSpan={span}>{children}</TableHeaderColumn>
}

export const DocsRow = TableRow

export function DocsCell({ multiline, children }) {
  return <TableRowColumn style={multiline && { whiteSpace: 'wrap' }}>{children}</TableRowColumn>
}
