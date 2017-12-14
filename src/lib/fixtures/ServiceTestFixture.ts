import {loadService} from '../core/load'
import {gatherServices, Service, ServiceConstructor} from '../core/Service'
import {TestFixture, TestFixtureProps} from './TestFixture'

export interface ServiceTestFixtureProps<ServiceType extends Service> extends TestFixtureProps {
  service: ServiceConstructor<ServiceType>
}

export class ServiceTestFixture<ServiceType extends Service> extends TestFixture<ServiceType>  {
  readonly serviceConstructor: ServiceConstructor
  service: ServiceType

  static async create<ServiceType extends Service>(props: ServiceTestFixtureProps<ServiceType>): Promise<ServiceTestFixture<ServiceType>> {
    const instance = new ServiceTestFixture<ServiceType>(props)
    await instance.load()
    return instance
  }

  private constructor({ service, ...superProps }: ServiceTestFixtureProps<ServiceType>) {
    super(superProps)
    this.serviceConstructor = service
  }

  get instance() {
    return this.service
  }

  unmount() {
    this.allServices.forEach((service) => {
      if (service.serviceWillUnmount) {
        service.serviceWillUnmount()
      }
    })
  }

  private get allServices() {
    return [this.service, ...gatherServices(this.service)]
  }

  private async load() {
    await loadService(
      new this.serviceConstructor({'@appContext': this.appContext})
    )

    this.service = new this.serviceConstructor({'@appContext': this.appContext}) as ServiceType

    this.allServices
      .forEach(this.initializeService)

    this.allServices
      .forEach((service) => {
        if (service.serviceDidMount) {
          service.serviceDidMount()
        }
      })
  }

  private initializeService = (service: any) => {
    service.state = {}

    service.setState = (state: any, callback?: () => void) => {
      service.state = {...service.state, ...state}
      if (callback) {
        callback()
      }
    }

    if (service.serviceWillMount) {
      service.serviceWillMount()
    }
  }
}
