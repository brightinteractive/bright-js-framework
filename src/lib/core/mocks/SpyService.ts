import { spy } from 'sinon'
import { Service } from '../Service'
import { InjectionContext } from '../InjectionClient'

export class SpyService extends Service<any> {
  constructor(ctx: InjectionContext) {
    super(ctx)
    this.serviceWillMount = spy()
    this.serviceDidMount = spy()
    this.serviceWillUnmount = spy()
  }
}
