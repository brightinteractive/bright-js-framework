import {expect} from 'chai'

import {isLoggedInInjector} from './AuthTokenPlugin';

describe('isLoggedInInjector', () => {

  it('should return false when no auth token state', () => {
    const appState = {AUTH_TOKEN_STATE: undefined}

    expect(isLoggedInInjector(appState)).to.eql(false)
  })

  it('should return false when no token in auth token state', () => {
    const appState = {AUTH_TOKEN_STATE: {token: undefined}}

    expect(isLoggedInInjector(appState)).to.eql(false)
  })

  it('should return true when no token expiry', () => {
    const appState = {AUTH_TOKEN_STATE: {token: {expiresAt: undefined}}}

    expect(isLoggedInInjector(appState)).to.eql(false)
  })

  it('should return false when token expiry is in the past', () => {
    const oneMilliSecondAgo = new Date()
    oneMilliSecondAgo.setMilliseconds(oneMilliSecondAgo.getSeconds() - 1)

    const appState = {AUTH_TOKEN_STATE: {token: {expiresAt: oneMilliSecondAgo}}}

    expect(isLoggedInInjector(appState)).to.eql(false)
  })

  it('should return true when token expiry is in the future', () => {
    const oneSecondFromNow = new Date()
    oneSecondFromNow.setSeconds(oneSecondFromNow.getSeconds() + 1)

    const appState = {AUTH_TOKEN_STATE: {token: {expiresAt: oneSecondFromNow}}}

    expect(isLoggedInInjector(appState)).to.eql(false)
  })
})
