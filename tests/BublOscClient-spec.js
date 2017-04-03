/* global describe, it, beforeEach */

var BublOscClient = require('../lib/BublOscClient')
var OscClient = require('../lib/OscClient')
var assert = require('assert')

describe('BublOscClient', function () {
  describe('instantiation', function () {
    var bublClient
    var client
    beforeEach(function () {
      bublClient = new BublOscClient()
      client = new OscClient()
    })

    it('should extend OscClient', function () {
      for (var clientProp in client) {
        if (typeof client[clientProp] === 'function') {
          assert.equal(typeof bublClient[clientProp], 'function')
        }
      }
    })
  })

  describe('bubl Methods', function () {
    var bublClient

    beforeEach(function () {
      bublClient = new BublOscClient()
    })

    describe('bublUpdate', function () {
      it('returns a promise', function () {
        var prom = bublClient.bublUpdate()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('bublGetImage', function () {
      it('returns a promise', function () {
        var prom = bublClient.bublGetImage()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('bublStop', function () {
      it('returns a promise', function () {
        var prom = bublClient.bublStop()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('bublPoll', function () {
      it('returns a promise', function () {
        var prom = bublClient.bublPoll()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('bublCaptureVideo', function () {
      it('returns a promise', function () {
        var prom = bublClient.bublCaptureVideo()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('bublTimelapse', function () {
      it('returns a promise', function () {
        var prom = bublClient.bublTimelapse()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('bublStream', function () {
      it('returns a promise', function () {
        var prom = bublClient.bublStream()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('bublShutdown', function () {
      it('returns a promise', function () {
        var prom = bublClient.bublShutdown()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })
  })
})
