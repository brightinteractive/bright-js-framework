declare module 'loader-utils' {
  export interface LoaderContext {
    query: { [key: string]: string | undefined }
    resourcePath: string
    context: string

    /** Add file as a dependency to the current module */
    resolve(context: string, request: string, callback: (err: {}, result: string) => void): void

    /** Add file as a dependency to the current module */
    addDependency(file: string): void
  }

  export function getOptions(ctx: LoaderContext): any
}
