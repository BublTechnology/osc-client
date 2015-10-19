// Copyright 2015 Bubl Technology Inc.
//
// Licensed under the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>.
// This file may not be copied, modified, or distributed
// except according to those terms.

'use strict';

var Q = require('q');
var request = require('request');
var httpRequestBody = require('./httpRequestBody');
var poll = require('./poll');
// var request = require('request');

// OSC COMMANDS EXECUTE
var commandsRequest = function(name, params, callback) {
    var commandsExecuteUrl = this.serverAddress + '/osc/commands/execute';
    request(httpRequestBody('POST', commandsExecuteUrl, 'application/json; charset=utf-8', {'name': name, 'parameters': params}), callback);
};


var commandsExecute = function(name, params, statusCallback) {
    var deferred = Q.defer();
    var client = this;
    commandsRequest.apply(client, [name, params, function(err, res, body) {
        var timeStamp = Date.now();
        if (res.headers['content-type'] === 'application/json; charset=utf-8') {
            var results = JSON.parse(body);
            if (results.state !== 'inProgress') {
                deferred.resolve({'error': err, 'response': res, 'body': results});
            } else {
                var commandId = results.id;
                poll.commandStatus(client, commandId, deferred, timeStamp, statusCallback);
                // if(isNode) { // TODO: remove the condition once poll.js is set up for sharing
                //
                //     poll.commandStatus(this, commandId, deferred, timeStamp, statusCallback);
                // } else {
                //     deferred.resolve({'error': err, 'response': res, 'body': results});
                // }
            }
        } else {
            deferred.resolve({'error': err, 'response': res, 'body': body});  // only for getImage command
        }
    }]);
    return deferred.promise;
};

module.exports = commandsExecute;
