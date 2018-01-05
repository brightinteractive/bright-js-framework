import {Store} from 'redux'
import {Service, ServiceConstructor} from '../../core/Service'
import {injectStore} from './StorePlugin'

export interface StateSelector<T, Props = {}> extends Service {
  readonly value: T
  setSelectionParams(props: Props): void
}

export type SelectServiceConstructor<T> = ServiceConstructor<StateSelector<T>>

export function createSelectService(selector: (x: any, props?: any) => any): SelectServiceConstructor<any> {
  class SelectService extends Service<{ value: any }> {
    private props: {} = {}

    @injectStore
    private store: Store<any>

    private unsubscribe: () => void

    get value() {
      if (this.unsubscribe) {
        return this.state.value

      } else {
        // If we haven't subscribed to store updates yet (and aren't caching the selected state)
        // then select directly from the store
        return this.select()
      }
    }

    setSelectionParams(props: any) {
      this.props = props

      this.setState({
        value: this.select()
      })
    }

    serviceWillMount() {
      this.setState({
        value: this.select()
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

    private select() {
      return selector(this.store.getState(), this.props)
    }

    private handleStoreChange = () => {
      this.setState({
        value: this.select()
      })
    }
  }

  return SelectService
}
