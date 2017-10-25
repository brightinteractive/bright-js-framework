declare module 'loader-utils' {
  export interface LoaderContext {
    /** The query of the request for the current loader. */
    query: string | { [key: string]: string | undefined }

    /** The resource file. */
    resourcePath: string

    /** The directory of the module. Can be used as context for resolving other stuff. */
    context: string

    /** Resolve a request like a require expression */
    resolve(context: string, request: string, callback: (err: {}, result: string) => void): void

    /** Add a file as dependency of the loader result in order to make them watchable */
    addDependency(file: string): void

    /**
     * Make this loader result cacheable. By default it’s not cacheable.

      A cacheable loader must have a deterministic result, when inputs and dependencie
      haven’t changed. This means the loader shouldn’t have other dependencies than
      specified with this.addDependency. Most loaders are deterministic and cacheable.
     */
    cacheable(flag?: boolean): void
  }

  /** Recommended way to retrieve the options of a loader invocation */
  export function getOptions(ctx: LoaderContext): any
}
