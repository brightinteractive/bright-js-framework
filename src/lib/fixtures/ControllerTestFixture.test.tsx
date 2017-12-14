import { expect } from 'chai'
import * as React from 'react'
import { decorateController } from '../core/Controller'
import { injectDependency } from '../core/InjectionClient'
import { exportDependency, PluginConfig } from '../core/PluginConfig'
import { ControllerTestFixture } from './ControllerTestFixture'

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

  it('should work without plugins being provided', async () => {
    const fixture = await ControllerTestFixture.create({
      markup: <div />
    })

    fixture.render()
  })

  it('should work allow multiple renders', async () => {
    const fixture = await ControllerTestFixture.create({
      markup: <div />
    })

    fixture.render()
    fixture.render()
  })

  it('allows dependencies to be injected', async () => {
    const fixture = await ControllerTestFixture.create({
      plugins: [TestPlugin],
      markup: <PluginConsumer />
    })

    expect(fixture.render()).to.have.text('value=1')
  })

  it('allows plugins to be accessed and stubbed', async () => {
    const fixture = await ControllerTestFixture.create({
      plugins: [TestPlugin],
      markup: <PluginConsumer />
    })

    fixture.getPlugin(TestPlugin).value = 5

    expect(fixture.render()).to.have.text('value=5')
  })
})
