import { spy, SinonSpy } from 'sinon'
import { Service, ServiceConstructor } from '../Service'
import { InjectionContext } from '../InjectionClient'
import { attachServices } from './SpyController'

export class SpyService extends Service<any> {
  constructor(ctx: InjectionContext) {
    super(ctx)
    this.serviceWillMount = spy()
    this.serviceDidMount = spy()
    this.serviceWillUnmount = spy()
  }
}

export interface SpyServiceResult {
  SpyService: ServiceConstructor,
  serviceWillMount: SinonSpy,
  serviceDidMount: SinonSpy,
  serviceWillLoad: SinonSpy,
  serviceDidLoad: SinonSpy,
}

export function spyService(children: ServiceConstructor[] = []): SpyServiceResult {
  const serviceWillLoad = spy()
  const serviceDidLoad = spy()
  const serviceWillMount = spy()
  const serviceDidMount = spy()

  class SpyServiceClass extends Service {
    constructor(context: any) {
      super(context)

      this.serviceWillLoad = serviceWillLoad
      this.serviceDidLoad = serviceDidLoad
      this.serviceWillMount = serviceWillMount
      this.serviceDidMount = serviceDidMount
    }
  }

  attachServices(children, SpyServiceClass.prototype)

  return {
    SpyService: SpyServiceClass,
    serviceWillLoad,
    serviceDidLoad,
    serviceWillMount,
    serviceDidMount
  }
}
