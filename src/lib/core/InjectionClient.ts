import { ApplicationContext } from './ApplicationContext'

export interface InjectionClient {
  context: InjectionContext
}

/** Shape of context passed into a controller */
export interface InjectionContext {
  '@appContext': ApplicationContext
}

export function inject(client: InjectionClient, id: string) {
  return client.context['@appContext'].injectedObjects[id]
}
