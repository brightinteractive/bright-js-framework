import { inject, state, exported, PluginConfig, Action } from '@brightinteractive/bright-js-framework'

const COUNTER_ACTIONS = 'counterActions'
const COUNTER_STATE = 'counter'

export interface CounterActions {
  increment(): void
}

interface CounterState {
  counterValue: number
}

export default class CounterPlugin extends PluginConfig<CounterState> {
  @state(COUNTER_STATE)
  static update(prev: number = 0, action: Action): number {
    if (action.type === 'counter:increment') {
      return prev + 1
    }

    return prev
  }

  @dispatcher()
  dispatch: Dispatcher

  @exported(COUNTER_ACTIONS)
  actions: CounterActions = {
    increment: () => {
      this.dispatch({ type: 'counter:increment' })
    }
  }
}

// Exported API to inject the action objects into a service or controller
export const counterActions = inject(COUNTER_ACTIONS)

// Exported API to bind a selected state value into a service or controller
export const counterValue = select((state) => state[COUNTER_STATE])
