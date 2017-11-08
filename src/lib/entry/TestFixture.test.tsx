import { expect } from 'chai'
import * as React from 'react'
import { decorateController } from '../core/Controller'
import { injectDependency } from '../core/InjectionClient'
import { exportDependency, PluginConfig } from '../core/PluginConfig'
import { TestFixture } from './TestFixture'

describe('TestFixture', () => {
  class TestPlugin extends PluginConfig {
    @exportDependency('value')
    getValue = () => this.value

    value: number = 1
  }

  @decorateController
  class PluginConsumer extends React.Component {
    @injectDependency('value')
    value: () => number

    shouldComponentUpdate() {
      return true
    }

    render() {
      return <div>value={this.value()}</div>
    }
  }

  it('should work without plugins being provided', () => {
    const fixture = new TestFixture({
      markup: <div />
    })

    fixture.render()
  })

  it('should work allow multiple renders', () => {
    const fixture = new TestFixture({
      markup: <div />
    })

    fixture.render()
    fixture.render()
  })

  it('allows dependencies to be injected', () => {
    const fixture = new TestFixture({
      plugins: [TestPlugin],
      markup: <PluginConsumer />
    })

    expect(fixture.render()).to.have.text('value=1')
  })

  it('allows plugins to be accessed and stubbed', () => {
    const fixture = new TestFixture({
      plugins: [TestPlugin],
      markup: <PluginConsumer />
    })

    fixture.stub(TestPlugin, (plugin) => {
      plugin.value = 5
    })

    expect(fixture.render()).to.have.text('value=5')
  })
})
