import * as React from 'react'
import { route, controller } from '@brightinteractive/bright-js-framework'
import { query, GraphQLQuery } from '@brightinteractive/bright-js-framework/plugins/graphql'
import * as PageQuery from './UserPage.graphql'

@route('/users/:id')
@controller()
export class UserPage extends React.PureComponent {
  @query(PageQuery)
  query: GraphQLQuery<any>

  render() {
    return (
      <div>
        First Name: {this.query.data.user.firstName}<br />
        Last Name: {this.query.data.user.lastName}<br />
      </div>
    )
  }
}
