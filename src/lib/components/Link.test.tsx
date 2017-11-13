import { expect } from 'chai'
import * as React from 'react'
import { spy } from 'sinon'
import { TestFixture } from '../entry/TestFixture'
import { Link } from './Link'

describe('<Link />', () => {
  it('should transition on click', () => {
    const fixture = new TestFixture({
      markup: <Link href="/foo" />
    })

    const evt = createEvent()
    fixture.render().find('a').simulate('click', evt)
    expect(fixture.location.pathname).to.eql('/foo')
    expect(evt.defaultPrevented).to.be.true
  })

  it('should use default behavior for right click', () => {
    const fixture = new TestFixture({
      markup: <Link href="/foo" />
    })

    const evt = createEvent({ button: 1 })
    fixture.render().find('a').simulate('click', evt)
    expect(evt.defaultPrevented).to.be.false
    expect(fixture.location.pathname).to.eql('/')
  })

  const keys: Array<Partial<keyof React.MouseEvent<{}>>> = ['metaKey', 'altKey', 'ctrlKey', 'shiftKey']
  keys.forEach((key) => {
    it(`should use default behavior for ${key} click`, () => {
      const fixture = new TestFixture({
        markup: <Link href="/foo" />
      })

      const evt = createEvent({
        [key]: true
      })

      fixture.render().find('a').simulate('click', evt)
      expect(evt.defaultPrevented).to.be.false
      expect(fixture.location.pathname).to.eql('/')
    })
  })

  it('should transition and call onClick handler when provided', () => {
    const onClick = spy()

    const fixture = new TestFixture({
      markup: <Link href="/foo" onClick={onClick} />
    })

    const evt = createEvent()

    fixture.render().find('a').simulate('click', evt)
    expect(evt.defaultPrevented).to.be.true
    expect(fixture.location.pathname).to.eql('/foo')
    expect(onClick).to.have.been.calledOnce
  })

  it('should not transition or perform default behavior when onClick prevents default', () => {
    const onClick = (e: React.MouseEvent<{}>) => {
      e.preventDefault()
    }

    const fixture = new TestFixture({
      markup: <Link href="/foo" onClick={onClick} />
    })

    const evt = createEvent()

    fixture.render().find('a').simulate('click', evt)
    expect(fixture.location.pathname).to.eql('/')
    expect(evt.defaultPrevented).to.be.true
  })
})

type MouseEvent = Pick<React.MouseEvent<{}>, 'preventDefault' | 'metaKey' | 'altKey' | 'shiftKey' | 'ctrlKey' | 'button' | 'defaultPrevented'>

function createEvent(props: Partial<MouseEvent> = {}): MouseEvent {
  const evt = {
    metaKey: false,
    altKey: false,
    shiftKey: false,
    ctrlKey: false,
    button: 0,
    defaultPrevented: false,
    preventDefault() {
      // React's event system wraps this in a SyntheticEvent so we need to hack
      // this to make sure that both the wrapped and wrapper events return true
      // for defaultPrevented.
      evt.defaultPrevented = true
      Object.defineProperty(this, 'defaultPrevented', {
        get: () => true
      })
    },
    ...props
  }

  return evt
}
