import * as React from 'react'
import {controller, route, RouteProps, service} from '@brightinteractive/bright-js-framework'
import {IsLoggedIn} from '../components/auth/IsLoggedIn'
import {IsNotLoggedIn} from '../components/auth/IsNotLoggedIn'
import {DemoAuthService} from '../plugins/demo-auth/DemoAuthService'

@route('/')
@controller()
export class IndexPage extends React.PureComponent<RouteProps<any, any>> {

  @service(DemoAuthService)
  demoAuthService: DemoAuthService

  loginAsAdmin = () => {
    this.demoAuthService.login('admin', 'password')
  }

  logout = () => {
    this.demoAuthService.logout()
  }

  render() {
    return (
      <div>
        <IsLoggedIn>
          Log in succeeded! <button onClick={this.logout}>Log me out!</button>
        </IsLoggedIn>
        <IsNotLoggedIn>
          <button onClick={this.loginAsAdmin}>Log me in!</button>
        </IsNotLoggedIn>

      </div>
    )
  }
}
