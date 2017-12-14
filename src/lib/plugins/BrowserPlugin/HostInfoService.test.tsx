import { expect } from 'chai'
import { ServiceTestFixture } from '../../fixtures/ServiceTestFixture'
import { HostInfoService } from './HostInfoService'

describe('HostInfoService', () => {
  const setup = () => ServiceTestFixture.create({
    service: HostInfoService,
    baseUrl: 'https://foo.com:213'
  })

  it('should return HostInfo props', async () => {
    const fixture = await setup()

    expect(fixture.instance.host).to.eql('foo.com:213')
    expect(fixture.instance.hostname).to.eql('foo.com')
    expect(fixture.instance.port).to.eql('213')
    expect(fixture.instance.protocol).to.eql('https:')
  })

  it('should return baseUrl', async () => {
    const fixture = await setup()
    expect(fixture.instance.baseUrl).to.eql('https://foo.com:213')
  })
})
