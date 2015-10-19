// Copyright 2015 Bubl Technology Inc.
//
// Licensed under the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>.
// This file may not be copied, modified, or distributed
// except according to those terms.

var httpRequestBody = require('./httpRequestBody');
var Q = require('q');
var request = require('request');

// HTTP REQUEST
var makeHttpRequest = function(method, url, contentType, body) {
    'use strict';
    var deferred = Q.defer();
    request(httpRequestBody(method, url, contentType, body), function(err, res, body) {
        if (res.headers['content-type'] === 'application/json; charset=utf-8') {
            body = JSON.parse(body);
        }
        deferred.resolve({'error': err, 'body': body, 'response': res});
    });
    return deferred.promise;
};

module.exports = makeHttpRequest;
