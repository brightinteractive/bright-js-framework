import * as React from 'react'

export class Link extends React.PureComponent<React.HTMLProps<{}>> {
  handleClick: React.MouseEventHandler<{}> = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e)

      if (e.defaultPrevented) {
        return
      }
    }

    if (!isRegularClick(e)) {
      return
    }

    // We don't have access to the routing API yet as DI isn't implemented.
    // When we do, prevent the default anchor behaviour and fire off the
    // transition.
  }

  render() {
    return (
      <a href={this.props.href} onClick={this.handleClick}>
        {this.props.children}
      </a>
    )
  }
}

function isRegularClick(e: React.MouseEvent<{}>) {
  return (e.button === 0) && !isModifiedClick(e)
}

function isModifiedClick(e: React.MouseEvent<{}>) {
  return Boolean(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
}
