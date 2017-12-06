import * as React from 'react'
import {controller, select, StateSelection} from '@brightinteractive/bright-js-framework'
import {isLoggedIn} from '@brightinteractive/bright-js-framework/plugins/auth'

@controller()
export class IsNotLoggedIn extends React.PureComponent {

    @select(isLoggedIn())
    isLoggedIn: StateSelection<boolean>

    render() {
        if (this.isLoggedIn.value || !this.props.children) {
            return <div/>
        } else {
            return this.props.children
        }
    }
}
