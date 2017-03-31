/* global describe, it */

var poll = require('../lib/poll')
var assert = require('assert')
var sinon = require('sinon')
var Q = require('q')

describe('poll', function () {
  describe('defaults', function () {
    it('has a default pollPeriod of 2000 milliseconds', function () {
      assert.equal(poll.pollPeriod, 2000)
    })
  })

  describe('commandStatus', function () {
    it('calls commandsStatus on client passed in', function (done) {
      var fakeClient = {
        commandsStatus: sinon.stub().returns({ then: function () {} })
      }
      var promise = {
        then: function () {},
        reject: function () {},
        resolve: function () {}
      }

      poll.pollPeriod = 1
      poll.commandStatus(fakeClient, 12, promise, Date.now(), null)
      setTimeout(function () {
        assert.equal(fakeClient.commandsStatus.called, true)
        done()
      }, 100)
    })

    it('sends the command id to commandStatus', function (done) {
      var fakeClient = {
        commandsStatus: sinon.stub().returns({ then: function () {} })
      }
      var promise = {
        then: function () {},
        reject: function () {},
        resolve: function () {}
      }

      poll.pollPeriod = 1
      poll.commandStatus(fakeClient, 15, promise, Date.now(), null)
      setTimeout(function () {
        assert(fakeClient.commandsStatus.calledWith(15))
        done()
      }, 100)
    })

    it('resolves promise if result.state is not in progress', function (done) {
      var spyOne = sinon.spy()
      var spyTwo = sinon.spy()
      var fakePromiseOne = {
        then: function (cb) {
          cb({ body: { state: 'finished' } })
        }
      }
      var fakeClient = {
        commandsStatus: sinon.stub().returns(fakePromiseOne)
      }
      var fakePromiseTwo = {
        then: function () {},
        reject: function () {},
        resolve: function () {
          spyOne()
        }
      }

      poll.pollPeriod = 1
      poll.commandStatus(fakeClient, 15, fakePromiseTwo, Date.now(), spyTwo)
      setTimeout(function () {
        assert.equal(spyOne.called, true)
        assert.equal(spyTwo.called, false)
        done()
      }, 100)
    })

    it('rejects promise if there is an error object on the response body', function (done) {
      var rejectSpy = sinon.spy()
      var resolveSpy = sinon.spy()
      var fakePromiseOne = Q.reject({ error: { message: 'bad error!' } })
      var fakePromise = {
        then: function () {},
        reject: function () {
          rejectSpy()
        },
        resolve: function () {
          resolveSpy()
        }
      }
      var fakeClient = {
        commandsStatus: sinon.stub().returns(fakePromiseOne)
      }
      poll.pollPeriod = 1
      poll.commandStatus(fakeClient, 12, fakePromise, Date.now(), null)
      setTimeout(function () {
        assert.equal(rejectSpy.called, true)
        assert.equal(resolveSpy.called, false)
        done()
      }, 100)
    })

    it('calls statusCallback if state is inProgress', function (done) {
      var spyOne = sinon.spy()
      var spyTwo = sinon.spy()
      var fakePromiseOne = Q({ state: 'inProgress' })
      var fakeClient = {
        commandsStatus: sinon.stub().returns(fakePromiseOne)
      }
      var fakePromiseTwo = {
        then: function () {},
        reject: function () {},
        resolve: function () {
          spyOne()
        }
      }

      poll.pollPeriod = 10
      poll.commandStatus(fakeClient, 15, fakePromiseTwo, Date.now(), spyTwo)
      setTimeout(function () {
        assert.equal(spyOne.called, false)
        assert.equal(spyTwo.called, true)
        done()
      }, 100)
    })
  })
})
