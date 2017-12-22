import {loadService} from '../core/load'
import {gatherServices, Service, ServiceConstructor, initializeService, ServiceContainer} from '../core/Service'
import {TestFixture, TestFixtureProps} from './TestFixture'

export interface ServiceTestFixtureProps<ServiceType extends Service> extends TestFixtureProps {
  service: ServiceConstructor<ServiceType>
  props?: any
}

export class ServiceTestFixture<ServiceType extends Service> extends TestFixture<ServiceType>  {
  readonly serviceConstructor: ServiceConstructor
  readonly serviceProps?: any
  service: ServiceType

  static async create<ServiceType extends Service>(props: ServiceTestFixtureProps<ServiceType>): Promise<ServiceTestFixture<ServiceType>> {
    const instance = new ServiceTestFixture<ServiceType>(props)
    await instance.load()
    return instance
  }

  private constructor({ service, props, ...superProps }: ServiceTestFixtureProps<ServiceType>) {
    super(superProps)
    this.serviceConstructor = service
    this.serviceProps = props
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
    this.appContext.applicationWillMount()
    await this.appContext.applicationWillLoad()

    await loadService(
      new this.serviceConstructor({ '@appContext': this.appContext }, {})
    )

    this.service = new this.serviceConstructor({'@appContext': this.appContext}, {}) as ServiceType

    this.allServices.forEach((service: Service) => {
      const container = new ServiceContainer()
      container.props = this.serviceProps

      initializeService(service, container)
    })

    this.allServices.forEach((service) => {
      if (service.serviceWillMount) {
        service.serviceWillMount()
      }
    })

    this.allServices.forEach((service) => {
      if (service.serviceDidMount) {
        service.serviceDidMount()
      }
    })

    this.appContext.applicationDidMount()
  }
}
