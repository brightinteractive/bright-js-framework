declare module 'react-error-overlay' {
  interface ErrorOpts {
    filename?: string
    onError?: () => void
  }
  export function startReportingRuntimeErrors(options: ErrorOpts): void
}
