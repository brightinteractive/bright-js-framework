import * as React from 'react'
import { controller } from '@brightinteractive/bright-js-framework'
import { eventManager, EventManager } from '../plugins/EventManagerPlugin'

@controller()
export class ControlPanel extends React.PureComponent {
  @eventManager
  eventManager: EventManager

  handleOpenClick = () => {
    this.eventManager.emit('request-open-pod-bay-doors')
  }

  componentDidMount() {
    this.eventManager.registerHandler('request-open-pod-bay-doors', () => {
      console.error('I’m sorry but I can’t do that, Dave')
    })
  }

  render() {
    return (
      <div>
        <h3>Pod Bay doors:</h3>
        <button onClick={this.handleOpenClick}>Open</button>
      </div>
    )
  }
}
