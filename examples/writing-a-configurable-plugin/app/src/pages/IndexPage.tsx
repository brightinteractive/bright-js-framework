import * as React from 'react'
import { route } from '@brightinteractive/bright-js-framework'

@route('/')
export class IndexPage extends React.PureComponent {
  render() {
    return <div>This will never be shown</div>
  }
}
