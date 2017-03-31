/* global describe, it */

var makeHttpRequest = require('../lib/makeHttpRequest')
var assert = require('assert')

describe('makeHttpRequest', function () {
  it('should return a promise', function () {
    var prom = makeHttpRequest('GET', 'http://localhost/')
    assert(typeof prom.then === 'function')
    assert(typeof prom.catch === 'function')
  })
})
