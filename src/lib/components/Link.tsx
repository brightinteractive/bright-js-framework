import * as React from 'react'
import { decorateServiceProperty } from '../core/Service'
import { decorateController } from '../core/Controller'
import { BrowserActions } from '../plugins/BrowserPlugin/BrowserActions'

@decorateController
export class Link extends React.PureComponent<React.HTMLProps<{}>> {
  @decorateServiceProperty(BrowserActions)
  actions: BrowserActions

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

    if (!this.props.href) {
      return
    }

    e.preventDefault()
    this.actions.pushLocation(this.props.href)
  }

  render() {
    const { href, onClick, ...props } = this.props

    return (
      <a {...props} href={this.props.href} onClick={this.handleClick}>
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
