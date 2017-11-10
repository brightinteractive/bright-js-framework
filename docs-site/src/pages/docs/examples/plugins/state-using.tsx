import * as React from 'react'
import { controller, select, StateSelection } from '@brightinteractive/bright-js-framework'
import { CounterActions, counterActions, counterValue } from '../plugins/CounterPlugin'
import { Button } from './widgets'

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
        <Button onClick={this.counter.increment}>Increment</Button>
      </div>
    )
  }
}
