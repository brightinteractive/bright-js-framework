declare module 'filewatcher' {
  export interface Filewatcher {
    add(filename: string): void
    on(event: 'change', fn: (file: string, stat?: {}) => any): void
  }

  function filewatcher(): Filewatcher
  export = filewatcher
}
