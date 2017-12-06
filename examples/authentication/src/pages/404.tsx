import * as React from 'react'
import { RouteProps, route } from '@brightinteractive/bright-js-framework'

@route('*')
export class Error404 extends React.PureComponent<RouteProps<any, any>> {
  render() {
    return (
      <h1>NOT FOUND</h1>
    )
  }
}
