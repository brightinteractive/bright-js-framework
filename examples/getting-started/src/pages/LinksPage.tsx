import * as React from 'react'
import { RouteProps, Link, route } from '@brightinteractive/bright-js-framework'

@route('/link')
export class IndexPage extends React.PureComponent<RouteProps> {
  render() {
    return <Link href="/">Home</Link>
  }
}
