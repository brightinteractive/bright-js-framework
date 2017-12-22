import {Store} from 'redux'
import {decorateServiceProperty, Service, ServiceConstructor} from '../../core/Service'
import {injectStore} from './StorePlugin'

export interface StateSelector<T> extends Service {
  readonly value: T
}

export type SelectServiceConstructor<T> = ServiceConstructor<StateSelector<T>>

export function createSelectService(selector: (x: any, props?: any) => any, getProps?: (x: any) => any): any {
  class SelectService extends Service<{ value: any }> {
    state = {value: undefined}

    @injectStore
    private store: Store<any>

    get selectorProps() {
      return getProps ? getProps(this.parent) : this.controllerProps
    }

    unsubscribe: () => void

    handleStoreChange = () => {
      this.setState({
        value: selector(this.store.getState(), this.selectorProps)
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
        return selector(this.store.getState(), this.selectorProps)
      }

      return this.state.value
    }
  }

  return decorateServiceProperty(SelectService)
}
