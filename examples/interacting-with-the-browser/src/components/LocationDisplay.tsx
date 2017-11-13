import * as React from 'react'
import { Location, StateSelection, controller, select, location } from '@brightinteractive/bright-js-framework'

@controller()
export class LocationDisplay extends React.PureComponent {
  @select(location)
  location: StateSelection<Location>

  render() {
    return <div>You are on page: {this.location.value.pathname}</div>
  }
}
