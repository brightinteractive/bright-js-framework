import * as React from 'react'
import { route, RouteProps } from '@brightinteractive/bright-js-framework'

export type UserPageParams = 'name'

@route('/users/:name')
export class UserPage extends React.PureComponent<RouteProps<UserPageParams>> {
  render() {
    return <div>Hello, {this.props.pathParams.name}!</div>
  }
}
