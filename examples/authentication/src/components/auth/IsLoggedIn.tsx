import * as React from 'react'
import {controller, select, StateSelection} from '@brightinteractive/bright-js-framework'
import {isLoggedIn} from '@brightinteractive/bright-js-framework/plugins/auth'

@controller()
export class IsLoggedIn extends React.PureComponent {

    @select(isLoggedIn())
    isLoggedIn: StateSelection<boolean>

    render() {
        if (this.isLoggedIn.value && this.props.children) {
            return React.Children.only(this.props.children)
        } else {
            return <div/>
        }
    }
}
