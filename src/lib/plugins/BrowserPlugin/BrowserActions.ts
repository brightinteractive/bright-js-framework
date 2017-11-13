import { History, LocationDescriptorObject } from 'history'
import { Service } from '../../core/Service'
import { injectHistory } from './BrowserPlugin'

export class BrowserActions extends Service {
  @injectHistory
  history: History

  replaceLocation(location: string | LocationDescriptorObject): void {
    // workaround for typescript failing to recognize union on overloaded function
    this.history.replace(location as any)
  }

  goBack(): void {
    this.history.goBack()
  }

  goForward(): void {
    this.history.goForward()
  }

  pushLocation(location: string | LocationDescriptorObject) {
    // workaround for typescript failing to recognize union on overloaded function
    this.history.push(location as any)
  }
}
