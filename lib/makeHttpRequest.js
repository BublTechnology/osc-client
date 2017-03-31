// Copyright 2015 Bubl Technology Inc.
//
// Licensed under the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>.
// This file may not be copied, modified, or distributed
// except according to those terms.

var Q = require('q')
var request = require('superagent')
var OscError = require('./OscError')

// HTTP REQUEST
var makeHttpRequest = function (method, url, contentType, body) {
  'use strict'
  var deferred = Q.defer()
  var requestMethod = null

  switch (method) {
    case 'POST':
      requestMethod = request.post
      break
    case 'GET':
      requestMethod = request.get
      break
    case 'PUT':
      requestMethod = request.put
      break
    case 'DELETE':
      requestMethod = request.delete
      break
    default:
      requestMethod = request.get
  }

  requestMethod(url)
    .type('json')
    .send(body)
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('X-XSRF-Protected', '1')
    .end(function (err, res) {
      if (err) {
        deferred.reject(new OscError(err.response.body))
        return
      }
      deferred.resolve(res.body)
    })

  return deferred.promise
}

module.exports = makeHttpRequest
