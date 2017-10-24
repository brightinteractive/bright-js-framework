import * as React from 'react'

export class Link extends React.PureComponent<React.HTMLProps<{}>> {
  handleClick: React.MouseEventHandler<{}> = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e)

      if (e.defaultPrevented) {
        return
      }
    }

    if (!isModifiedClick(e)) {
      return
    }

    // e.preventDefault()
  }

  render() {
    return (
      <a href={this.props.href} onClick={this.handleClick}>
        {this.props.children}
      </a>
    )
  }
}

function isModifiedClick(e: React.MouseEvent<{}>) {
  return e.metaKey || e.altKey || e.ctrlKey
}
