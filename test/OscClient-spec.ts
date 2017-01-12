import { OscClient } from '../src/OscClient'
import * as chai from 'chai'

const assert = chai.assert

describe('OscClient', () => {

  let client: OscClient

  describe('instantiation', function () {
    describe('defaults', function () {
      beforeEach(function () {
        client = new OscClient()
      })

      it('should form a proper serverAddress with the default host and port', () => {
        assert.equal(client.serverAddress(), 'http://localhost:8000')
      })
    })

    describe('custom port', function () {
      beforeEach(function () {
        client = new OscClient(undefined, 9999)
      })

      it('should form a proper serverAddress with the host and custom port', function () {
        assert.equal(client.serverAddress(), 'http://localhost:9999')
      })
    })
    describe('custom host', function () {
      beforeEach(function () {
        client = new OscClient('192.168.1.100', 1234)
      })

      it('should form a proper serverAddress with the custom host', function () {
        assert.equal(client.serverAddress(), 'http://192.168.1.100:1234')
      })
    })
  })
})
