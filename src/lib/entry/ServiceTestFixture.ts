import {Store} from 'redux'
import {createMemoryHistory, History, Location} from 'history'
import {filter} from 'lodash'
import {PluginConfig, PluginConstructor} from '../core/PluginConfig'
import {ApplicationContext} from '../core/ApplicationContext'
import {loadService} from '../core/load'
import {createBrowserPlugin} from '../plugins/BrowserPlugin/BrowserPlugin'
import {mountSpy} from '../plugins/ControllerMountSpyPlugin/ControllerMountSpyPlugin'
import {gatherServices, Service, ServiceConstructor} from '../core/Service'

export interface ServiceTestFixtureProps {
  plugins?: PluginConstructor[]
  location?: string
  hostname?: string
  host?: string
  protocol?: string
  port?: number
  service: ServiceConstructor
}

export class ServiceTestFixture<ServiceType extends Service> {
  readonly history: History = createMemoryHistory()
  private appContext: ApplicationContext
  service: ServiceType
  readonly serviceConstructor: ServiceConstructor

  static async createMountedService<ServiceType extends Service>(props: ServiceTestFixtureProps): Promise<ServiceTestFixture<ServiceType>> {
    const instance = new ServiceTestFixture<ServiceType>(props)
    await instance.load()
    return instance
  }

  private constructor({
                        service: serviceConstructor,
                        plugins = [],
                        location = '/',
                        hostname = 'example.com', host = 'example.com', protocol = 'http', port = 80
                      }: ServiceTestFixtureProps) {
    this.history.push(location)
    this.appContext = new ApplicationContext([
      ...plugins,
      mountSpy(),
      createBrowserPlugin({history: this.history, host, hostname, protocol, port})
    ])
    this.serviceConstructor = serviceConstructor
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

  getPlugin<T extends PluginConfig>(constructor: PluginConstructor<T>): T {
    const matches = filter(this.appContext.plugins, (x) => x instanceof constructor) as T[]

    if (!matches[0]) {
      throw new Error(`Could not find installed plugin of type ${constructor.name}`)
    }

    return matches[0]
  }

  unmount() {
    this.allServices
      .forEach((service) => {
        if (service.serviceWillUnmount) {
          service.serviceWillUnmount()
        }
      })
  }

  get location(): Location {
    return this.history.location
  }

  get store(): Store<any> {
    return this.appContext.store
  }
}
