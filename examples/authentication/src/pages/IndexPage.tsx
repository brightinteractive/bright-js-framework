import * as React from 'react'
import {controller, route, RouteProps, service} from '@brightinteractive/bright-js-framework'
import {IsLoggedIn} from '../components/auth/IsLoggedIn'
import {IsNotLoggedIn} from '../components/auth/IsNotLoggedIn'
import {DemoAuthService} from '../auth/demo-auth/DemoAuthService'
import '../sass/base.scss'

@route('/')
@controller()
export class IndexPage extends React.PureComponent<RouteProps<any, any>> {

  @service(DemoAuthService)
  demoAuthService: DemoAuthService

  loginAsAdmin = () => {
    this.demoAuthService.login('admin', 'password')
  }

  render() {
    return (
      <div>
        <IsLoggedIn>
          Log in succeeded!
        </IsLoggedIn>
        <IsNotLoggedIn>
          <button onClick={this.loginAsAdmin}>Log me in!</button>
        </IsNotLoggedIn>

      </div>
    )
  }
}
