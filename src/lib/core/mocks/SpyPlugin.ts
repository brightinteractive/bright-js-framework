import {SinonSpy, spy} from 'sinon'
import {InjectionContext} from '../InjectionClient'
import {PluginConfig, PluginConstructor} from '../PluginConfig'

export class SpyPlugin extends PluginConfig<any> {
  constructor(ctx: InjectionContext) {
    super(ctx)
    this.serviceWillMount = spy()
    this.serviceDidMount = spy()
    this.serviceWillUnmount = spy()
    this.pageWillTransition = spy()
  }
}

export interface SpyPluginResult {
  SpyPlugin: PluginConstructor,
  serviceWillMount: SinonSpy,
  serviceDidMount: SinonSpy,
  serviceWillLoad: SinonSpy,
  serviceDidLoad: SinonSpy,
  pageWillTransition: SinonSpy,
}

export function spyPlugin(): SpyPluginResult {
  const serviceWillLoad = spy()
  const serviceDidLoad = spy()
  const serviceWillMount = spy()
  const serviceDidMount = spy()
  const pageWillTransition = spy()

  class SpyPluginConfigClass extends PluginConfig {
    constructor(context: any) {
      super(context)

      this.serviceWillLoad = serviceWillLoad
      this.serviceDidLoad = serviceDidLoad
      this.serviceWillMount = serviceWillMount
      this.serviceDidMount = serviceDidMount
      this.pageWillTransition = pageWillTransition
    }
  }

  return {
    SpyPlugin: SpyPluginConfigClass,
    serviceWillLoad,
    serviceDidLoad,
    serviceWillMount,
    serviceDidMount,
    pageWillTransition
  }
}
