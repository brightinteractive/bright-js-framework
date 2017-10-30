import * as React from 'react'
import { route, RouteProps } from '@brightinteractive/bright-js-framework'

export interface IndexPageParams {
  name: string
}

@route('/:name')
export class IndexPage extends React.PureComponent<RouteProps<IndexPageParams>> {
  render() {
    return <div>Hello, {this.props.pathParams.name}!</div>
  }
}
