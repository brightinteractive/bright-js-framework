import { Store } from 'redux'
import { Service, ServiceConstructor, decorateServiceProperty } from '../../core/Service'
import { injectStore } from './StorePlugin'

export interface StateSelector<T> extends Service {
  readonly value: T
}

export type SelectServiceConstructor<T> = ServiceConstructor<StateSelector<T>>

export function createSelectService(selector: (x: any, props: any) => any): any {
  class SelectService extends Service<{ value: any }> {
    @injectStore
    private store: Store<any>

    unsubscribe: () => void

    handleStoreChange = () => {
      this.setState({
        value: selector(this.store.getState(), this.controllerProps)
      })
    }

    serviceDidMount() {
      this.unsubscribe = this.store.subscribe(this.handleStoreChange)
    }

    serviceWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe()
      }
    }

    get value() {
      if (typeof this.state.value === 'undefined') {
        return selector(this.store.getState(), this.controllerProps)
      }

      return this.state.value
    }
  }

  return decorateServiceProperty(SelectService)
}
