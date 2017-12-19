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

  const TEST_STATE_KEY = 'key'
  const TEST_STATE_VALUE = 'value'

  it('can access an inject value', async () => {
    class ServiceWithInjectedValue extends Service {
      @inject('value')
      value: () => number
    }

    const fixture = await ServiceTestFixture.create<ServiceWithInjectedValue>({
      service: ServiceWithInjectedValue,
      plugins: [TestPlugin]
    })

    expect(fixture.service.value()).to.eql(1)
  })

  it('Receives specified controller props', async () => {
    const fixture = await ServiceTestFixture.create({
      service: SpyService,
      plugins: [TestPlugin]
    })

    expect(fixture.service.context['@appContext'].getInjectedObject('value')()).to.eql(1)
  })

  it('Can access the value of the plugin', async () => {
    const fixture = await ServiceTestFixture.create({
      service: SpyService,
      plugins: [TestPlugin],
      props: {
        foo: 'bar'
      }
    })

    const { foo } = fixture.instance.controllerProps as any
    expect(foo).to.eql('bar')
  })

  it('allows plugins to be accessed and stubbed', async () => {
    const fixture = await ServiceTestFixture.create({
      service: SpyService,
      plugins: [TestPlugin],
    })

    fixture.getPlugin(TestPlugin).value = 5

    expect(fixture.service.context['@appContext'].getInjectedObject('value')()).to.eql(5)
  })

  describe('setState', () => {
    it('should return value afterwards', async () => {
      const fixture = await ServiceTestFixture.create({
        service: SpyService,
      })

      fixture.service.setState({[TEST_STATE_KEY]: TEST_STATE_VALUE})

      expect(fixture.service.state[TEST_STATE_KEY]).to.eql(TEST_STATE_VALUE)
    })

    it('calls supplied callback', async () => {
      const fixture = await ServiceTestFixture.create({
        service: SpyService,
      })

      const spyFunction = spy()

      fixture.service.setState({[TEST_STATE_KEY]: TEST_STATE_VALUE}, spyFunction)

      expect(spyFunction).to.have.been.calledOnce
    })
  })

  describe('Lifecycle Hooks', () => {
    it('component will mount is called twice (once to load, once for mount)', async () => {
      const fixture = await ServiceTestFixture.create({
        service: spyService().SpyService,
      })

      expect(fixture.service.serviceWillMount).to.have.been.calledTwice
    })

    it('component did mount is called once after will mount', async () => {
      const fixture = await ServiceTestFixture.create({
        service: spyService().SpyService,
      })

      expect(fixture.service.serviceDidMount).to.have.been.calledOnce
      expect(fixture.service.serviceDidMount).to.have.been.calledAfter(fixture.service.serviceWillMount as SinonSpy)
    })

    it('component will load and then did load', async () => {
      const fixture = await ServiceTestFixture.create({
        service: spyService().SpyService,
      })

      expect(fixture.service.serviceWillLoad).to.have.been.calledOnce
      expect(fixture.service.serviceDidLoad).to.have.been.calledAfter(fixture.service.serviceWillLoad as SinonSpy)
    })

    it('component should be unmounted', async () => {
      const fixture = await ServiceTestFixture.create({
        service: spyService().SpyService,
      })

      fixture.unmount()

      expect(fixture.service.serviceWillUnmount).to.have.been.calledOnce
    })
  })
})
