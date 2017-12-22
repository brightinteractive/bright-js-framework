import {Store} from 'redux'
import {decorateServiceProperty, Service, ServiceConstructor} from '../../core/Service'
import {injectStore} from './StorePlugin'

export interface SelectSpy<T> extends Service {
  readonly values: T[]
  nextValue(): Promise<T>
}

export type SelectSpyServiceConstructor<T> = ServiceConstructor<SelectSpy<T>>

export function createSelectSpyService<Props>(selector: (x: any, props: Props) => any, getProps?: (x: any) => Props): any {
  class SelectSpyService extends Service<{ value: any }> implements SelectSpy<any> {
    readonly values: any[] = [
      this.currentValue
    ]

    private spys: Array<(x: any) => void> = []

    controllerProps: Props

    state = {value: undefined}

    @injectStore
    private store: Store<any>

    unsubscribe: () => void

    nextValue() {
      return new Promise((resolve) => {
        this.spys.push(resolve)
      })
    }

    private get props() {
      return getProps ? getProps(this.parent) : this.controllerProps
    }

    private get currentValue() {
      return selector(this.store.getState(), this.props)
    }

    private get lastValue() {
      return this.values[this.values.length - 1]
    }

    handleStoreChange = () => {
      if (this.currentValue !== this.lastValue) {
        this.values.push(this.currentValue)

        this.spys.forEach((spy) => {
          spy(this.currentValue)
        })
        this.spys = []
      }
    }

    serviceDidMount() {
      this.unsubscribe = this.store.subscribe(this.handleStoreChange)
    }

    serviceWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe()
      }
    }
  }

  return decorateServiceProperty(SelectSpyService)
}
