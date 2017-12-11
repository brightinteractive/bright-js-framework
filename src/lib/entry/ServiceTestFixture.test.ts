import {exportDependency, PluginConfig} from '../core/PluginConfig'
import {ServiceTestFixture} from './ServiceTestFixture'
import {spyService, SpyService} from '../core/mocks/SpyService'
import {expect} from 'chai'
import {SinonSpy, spy} from 'sinon'
import {inject, Service} from '../../index'

describe('ServiceTestFixture', () => {
  class TestPlugin extends PluginConfig {
    @exportDependency('value')
    getValue = () => this.value

    value = 1
  }

  it('Service can access an inject value', async () => {
    class ServiceWithInjectedValue extends Service {
      @inject('value')
      value: () => number
    }

    const fixture = await ServiceTestFixture.createMountedService<ServiceWithInjectedValue>({
      service: ServiceWithInjectedValue,
      plugins: [TestPlugin]
    })

    expect(fixture.service.value()).to.eql(1)
  })

  it('Service can access the value of the plugin', async () => {
    const fixture = await ServiceTestFixture.createMountedService({
      service: SpyService,
      plugins: [TestPlugin]
    })

    expect(fixture.service.context['@appContext'].getInjectedObject('value')()).to.eql(1)
  })

  it('allows plugins to be accessed and stubbed', async () => {
    const fixture = await ServiceTestFixture.createMountedService({
      service: SpyService,
      plugins: [TestPlugin],
    })

    fixture.getPlugin(TestPlugin).value = 5

    expect(fixture.service.context['@appContext'].getInjectedObject('value')()).to.eql(5)
  })

  describe('setState', () => {
    it('should return value afterwards', async () => {
      const fixture = await ServiceTestFixture.createMountedService({
        service: SpyService,
      })

      const STATE_KEY = 'key'
      const STATE_VALUE = 'value'

      fixture.service.setState({[STATE_KEY]: STATE_VALUE})

      expect(fixture.service.state[STATE_KEY]).to.eql(STATE_VALUE)
    })

    it('calls supplied callback', async () => {
      const fixture = await ServiceTestFixture.createMountedService({
        service: SpyService,
      })

      const STATE_KEY = 'key'
      const STATE_VALUE = 'value'

      const spyFunction = spy()

      fixture.service.setState({[STATE_KEY]: STATE_VALUE}, spyFunction)

      expect(spyFunction).to.have.been.calledOnce
    })
  })

  describe('Lifecycle Hooks', () => {
    it('component will mount is called twice (once to load, once for mount)', async () => {
      const fixture = await ServiceTestFixture.createMountedService({
        service: spyService().SpyService,
      })

      expect(fixture.service.serviceWillMount).to.have.been.calledTwice
    })

    it('component did mount is called once after will mount', async () => {
      const fixture = await ServiceTestFixture.createMountedService({
        service: spyService().SpyService,
      })

      expect(fixture.service.serviceDidMount).to.have.been.calledOnce
      expect(fixture.service.serviceDidMount).to.have.been.calledAfter(fixture.service.serviceWillMount as SinonSpy)
    })

    it('component will load and then did load', async () => {
      const fixture = await ServiceTestFixture.createMountedService({
        service: spyService().SpyService,
      })

      expect(fixture.service.serviceWillLoad).to.have.been.calledOnce
      expect(fixture.service.serviceDidLoad).to.have.been.calledAfter(fixture.service.serviceWillLoad as SinonSpy)
    })

    it('component should be unmounted', async () => {
      const fixture = await ServiceTestFixture.createMountedService({
        service: spyService().SpyService,
      })

      fixture.unmount()

      expect(fixture.service.serviceWillUnmount).to.have.been.calledOnce
    })
  })
})
