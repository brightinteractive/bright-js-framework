import {SinonSpy, spy} from 'sinon'
import {Service, ServiceConstructor} from '../Service'
import {InjectionContext} from '../InjectionClient'
import {attachServices} from './SpyController'

export class SpyService extends Service<any> {
  constructor(ctx: InjectionContext, parent: {}) {
    super(ctx, parent)
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
  serviceWillUnmount: SinonSpy,
}

export function spyService(children: ServiceConstructor[] = []): SpyServiceResult {
  const serviceWillMount = spy()
  const serviceDidMount = spy()
  const serviceWillLoad = spy()
  const serviceDidLoad = spy()
  const serviceWillUnmount = spy()

  class SpyServiceClass extends Service {
    constructor(context: any, parent: {}) {
      super(context, parent)

      this.serviceWillMount = serviceWillMount
      this.serviceDidMount = serviceDidMount
      this.serviceWillLoad = serviceWillLoad
      this.serviceDidLoad = serviceDidLoad
      this.serviceWillUnmount = serviceWillUnmount
    }
  }

  attachServices(children, SpyServiceClass.prototype)

  return {
    SpyService: SpyServiceClass,
    serviceWillMount,
    serviceDidMount,
    serviceWillLoad,
    serviceDidLoad,
    serviceWillUnmount,
  }
}
