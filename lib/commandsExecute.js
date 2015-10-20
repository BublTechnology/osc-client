// Copyright 2015 Bubl Technology Inc.
//
// Licensed under the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>.
// This file may not be copied, modified, or distributed
// except according to those terms.

'use strict';

var Q = require('q');
var request = require('superagent');
var poll = require('./poll');

// OSC COMMANDS EXECUTE
var commandsRequest = function(name, params, callback) {
    var commandsExecuteUrl = this.serverAddress + '/osc/commands/execute';
    request.post(commandsExecuteUrl)
    .type('json')
    .send({name: name, parameters: params})
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('X-XSRF-Protected', '1')
    .end(callback);

};


var commandsExecute = function(name, params, statusCallback) {
    var deferred = Q.defer();
    var client = this;
    commandsRequest.apply(client, [name, params, function(err, res) {

        var timeStamp = Date.now();
        if (res.headers['content-type'] === 'application/json; charset=utf-8') {
            if (res.body.state !== 'inProgress') {
                deferred.resolve({'error': err, 'body': res.body, 'response': res.res });
            } else {
                var commandId = res.body.id;
                poll.commandStatus(client, commandId, deferred, timeStamp, statusCallback);
                // if(isNode) { // TODO: remove the condition once poll.js is set up for sharing
                //
                //     poll.commandStatus(this, commandId, deferred, timeStamp, statusCallback);
                // } else {
                //     deferred.resolve({'error': err, 'response': res, 'body': results});
                // }
            }
        } else {
            deferred.resolve({'error': err, 'body': res.body, 'response': res.res });  // only for getImage command
        }
    }]);
    return deferred.promise;
};

module.exports = commandsExecute;
