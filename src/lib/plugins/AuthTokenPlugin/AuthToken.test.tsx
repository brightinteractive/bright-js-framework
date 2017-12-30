import {expect} from 'chai'

import {isLoggedInInjector} from './AuthTokenPlugin'

describe('isLoggedInInjector', () => {

  it('should return false when no auth token state', () => {
    const appState = {authTokenValue: undefined}

    expectIsLoggedInIsFalse(appState)
  })

  it('should return false when no token in auth token state', () => {
    const appState = {authTokenValue: {token: undefined}}

    expectIsLoggedInIsFalse(appState)
  })

  it('should return true when no token expiry', () => {
    const appState = {authTokenValue: {token: {expiresAt: undefined}}}

    expectIsLoggedInIsTrue(appState)
  })

  it('should return false when token expiry is in the past', () => {
    const tenSecondsAgo = new Date()
    tenSecondsAgo.setSeconds(tenSecondsAgo.getSeconds() - 10)
    const appState = {authTokenValue: {token: {expiresAt: tenSecondsAgo}}}

    expectIsLoggedInIsFalse(appState)
  })

  it('should return true when token expiry is in the future', () => {
    const oneSecondFromNow = new Date()
    oneSecondFromNow.setSeconds(oneSecondFromNow.getSeconds() + 1)
    const appState = {authTokenValue: {token: {expiresAt: oneSecondFromNow}}}

    expectIsLoggedInIsTrue(appState)
  })

  function expectIsLoggedInIsFalse(appState: { authTokenValue: any }) {
    expectIsLoggedInIs(false, appState)
  }

  function expectIsLoggedInIsTrue(appState: { authTokenValue: any }) {
    expectIsLoggedInIs(true, appState)
  }

  function expectIsLoggedInIs(isLoggedIn: boolean, appState: { authTokenValue: any }) {
    expect(isLoggedInInjector(appState)).to.eql(isLoggedIn)
  }
})
