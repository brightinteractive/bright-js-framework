import {exported, inject, PluginConfig} from '@brightinteractive/bright-js-framework'

const EVENT_MANAGER = 'eventManager'

export const eventManager = inject(EVENT_MANAGER)

export default class EventManagerPlugin extends PluginConfig {
  @exported(EVENT_MANAGER)
  eventManager = new EventManager()
}

export type EventHandler = (event: any) => void

export class EventManager {
  private eventHandlers: Map<string, Set<EventHandler>> = new Map()

  registerHandler(eventKey: string, eventHandler: EventHandler) {
    const existingHandlers = this.eventHandlers.get(eventKey) || new Set()
    this.eventHandlers.set(eventKey, existingHandlers.add(eventHandler))
  }

  emit(eventKey: string, event?: any) {
    const handlers = this.eventHandlers.get(eventKey)
    if (!handlers) {
      return
    }

    handlers.forEach((eventHandler) => eventHandler(event))
  }
}
