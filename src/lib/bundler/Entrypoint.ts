import { PluginConstructor } from '../core/PluginConfig'

export type Entrypoint = (modules: RequireList, opts: EntryOpts) => void

export interface EntryOpts {
  config(): PluginConstructor[]
}

export type RequireList = Array<() => any>
