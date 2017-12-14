import { injectDependency } from '../../core/InjectionClient'
import { Service } from '../../core/Service'
import { HostInfo, HOST_INFO } from './BrowserPlugin'

export class HostInfoService extends Service implements HostInfo {
  @injectDependency(HOST_INFO)
  private hostInfo: HostInfo

  get hostname() {
    return this.hostInfo.hostname
  }

  get host() {
    return this.hostInfo.host
  }

  get protocol() {
    return this.hostInfo.protocol
  }

  get port() {
    return this.hostInfo.port
  }

  get baseUrl(): string {
    return this.protocol + '//' + this.host
  }
}
