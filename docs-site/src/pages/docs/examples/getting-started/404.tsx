import * as React from 'react'
import { route, RouteProps } from '@brightinteractive/bright-js-framework'

@route('*')
export class NotFoundPage extends React.PureComponent<RouteProps> {
  render() {
    return <h1>404 Not Found</h1>
  }
}
