import React from 'react'
import { Table, TableHeader, TableBody, TableRow, TableRowColumn, TableHeaderColumn } from 'material-ui'

export const OptionsTable = ({ children, cli }) => (
  <Table style={{ tableLayout: 'auto' }} selectable={false} fixedHeader={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>{cli ? 'Flag' : 'Key'}</TableHeaderColumn>
        <TableHeaderColumn>Type</TableHeaderColumn>
        {cli && <TableHeaderColumn>Shortcut</TableHeaderColumn>}
        <TableHeaderColumn>Description</TableHeaderColumn>
        <TableHeaderColumn>Default Value</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {children}
    </TableBody>
  </Table>
)

export const Option = ({ flag, name, shortcut, type, description, defaultValue }) => (
  <TableRow>
    <TableRowColumn>
      {flag || name}
    </TableRowColumn>
    <TableRowColumn>
      {type}
    </TableRowColumn>
    {
      shortcut && (
        <TableRowColumn>
          {shortcut}
        </TableRowColumn>
      )
    }
    <TableRowColumn style={multiline}>
      {description}
    </TableRowColumn>
    <TableRowColumn style={multiline}>
      {defaultValue}
    </TableRowColumn>
  </TableRow>
)

const multiline = { whiteSpace: 'wrap' }
