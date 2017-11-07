import * as React from 'react'
import { route, RouteProps } from '@brightinteractive/bright-js-framework'

export interface UserPageParams {
  name: string
}

@route('/users/:id')
@controller()
export class UserPage extends React.PureComponent<RouteProps<UserPageParams>> {

}
