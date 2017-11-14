import * as React from 'react'
import { controller, service, BrowserActions } from '@brightinteractive/bright-js-framework'

@controller()
export class LocationChange extends React.PureComponent {
  @service(BrowserActions)
  browser: BrowserActions

  handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    const input = event.currentTarget.querySelector('input')
    if (input) {
      this.browser.pushLocation(input.value)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Go to: <input />
      </form>
    )
  }
}
