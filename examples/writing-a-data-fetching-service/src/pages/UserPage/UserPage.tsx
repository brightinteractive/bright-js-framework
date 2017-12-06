import * as React from 'react'
import { controller, route } from '@brightinteractive/bright-js-framework'
import { get, HttpGet } from '../../plugins/SimpleHttpFetcher'

interface User {
  firstName: string
  lastName: string
}

@route('/me')
@controller()
export class UserPage extends React.PureComponent {
  @get('http://my-api.com/me')
  query: HttpGet<User>

  render() {
    return (
      <div>
        First Name: {this.query.data.firstName}<br />
        Last Name: {this.query.data.lastName}<br />
      </div>
    )
  }
}
