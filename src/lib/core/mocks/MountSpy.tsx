import * as React from 'react'

export function mountSpy() {
  let resolvePromise = () => {}
  const didMount = new Promise((resolve) => {
    resolvePromise = resolve
  })

  return {
    didMount,
    MountSpy: class MountSpy extends React.Component {
      componentDidMount() {
        resolvePromise()
      }

      render() {
        return this.props.children || null
      }
    }
  }
}
