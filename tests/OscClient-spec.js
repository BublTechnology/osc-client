/* global describe, it, beforeEach */

var assert = require('assert')
var OscClient = require('../lib/OscClient')

describe('OscClient', function () {
  var client

  describe('instantiation', function () {
    describe('defaults', function () {
      beforeEach(function () {
        client = new OscClient()
      })

      it('should have an applicationOctetType property', function () {
        assert.equal(client.applicationOctetType, 'application/octet-stream')
      })

      it('should have an applicationJsonType property', function () {
        assert.equal(client.applicationJsonType, 'application/json; charset=utf-8')
      })

      it('should form a proper serverAddress with the default host and port', function () {
        assert.equal(client.serverAddress, 'http://localhost:8000')
      })
    })

    describe('custom port', function () {
      beforeEach(function () {
        client = new OscClient(null, '9999')
      })

      it('should form a proper serverAddress with the host and custom port', function () {
        assert.equal(client.serverAddress, 'http://localhost:9999')
      })
    })
    describe('custom host', function () {
      beforeEach(function () {
        client = new OscClient('192.168.1.100', '1234')
      })

      it('should form a proper serverAddress with the custom host', function () {
        assert.equal(client.serverAddress, 'http://192.168.1.100:1234')
      })
    })
  })

  describe('instance methods', function () {
    beforeEach(function () {
      client = new OscClient()
    })

    describe('getInfo', function () {
      it('returns a promise', function () {
        var prom = client.getInfo()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('getState', function () {
      it('returns a promise', function () {
        var prom = client.getState()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('checkForUpdates', function () {
      it('returns a promise', function () {
        var prom = client.checkForUpdates()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('startSession', function () {
      it('returns a promise', function () {
        var prom = client.startSession()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('updateSession', function () {
      it('returns a promise', function () {
        var prom = client.updateSession()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('closeSession', function () {
      it('returns a promise', function () {
        var prom = client.closeSession()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('takePicture', function () {
      it('returns a promise', function () {
        var prom = client.takePicture()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('listImages', function () {
      it('returns a promise', function () {
        var prom = client.listImages()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('delete', function () {
      it('returns a promise', function () {
        var prom = client.delete()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('getImage', function () {
      it('returns a promise', function () {
        var prom = client.getImage()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('getMetadata', function () {
      it('returns a promise', function () {
        var prom = client.getMetadata()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('setOptions', function () {
      it('returns a promise', function () {
        var prom = client.setOptions()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })

    describe('getOptions', function () {
      it('returns a promise', function () {
        var prom = client.getOptions()
        assert.equal(typeof prom.then, 'function')
        assert.equal(typeof prom.catch, 'function')
      })
    })
  })
})
