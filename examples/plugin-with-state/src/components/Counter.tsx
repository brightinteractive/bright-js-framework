import * as React from 'react'
import { controller, select, StateSelection } from '@brightinteractive/bright-js-framework'
import { CounterActions, counterActions, counterValue } from '../plugins/CounterPlugin'

@controller()
export class Counter extends React.PureComponent {
  @select(counterValue)
  counterValue: StateSelection<number>

  @counterActions
  counter: CounterActions

  render() {
    return (
      <div>
        Value: {this.counterValue.value}
        <button onClick={this.counter.increment}>Increment</button>
      </div>
    )
  }
}
