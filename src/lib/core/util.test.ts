import { spy } from 'sinon'
import { expect } from 'chai'
import { patchMethod } from './util'

describe('patchMethod', () => {
  it('should call original implementation ', () => {
    const original = spy()
    const object = {
      foo: original
    }

    patchMethod(object, 'foo', spy())
    object.foo(1, 2, 3)

    expect(original).to.have.been.calledWith(1, 2, 3)
    expect(original).to.have.been.calledOn(object)
  })

  it('should call patched implementation ', () => {
    const object = {
      foo: spy()
    }

    const injected = spy()
    patchMethod(object, 'foo', injected)
    object.foo(1, 2, 3)

    expect(injected).to.have.been.calledWith(1, 2, 3)
    expect(injected).to.have.been.calledOn(object)
  })

  it('should handle case where object has no existing implementation', () => {
    const object: any = {}

    const injected = spy()
    patchMethod(object, 'foo', injected)
    object.foo(1, 2, 3)

    expect(injected).to.have.been.calledWith(1, 2, 3)
    expect(injected).to.have.been.calledOn(object)
  })
})
