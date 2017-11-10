import * as React from 'react'
import { RouteProps, route } from '@brightinteractive/bright-js-framework'

@route('/')
export class IndexPage extends React.PureComponent<RouteProps> {
  render() {
    return <div>Hello, world!</div>
  }
}
