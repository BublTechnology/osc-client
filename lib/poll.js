// Copyright 2015 Bubl Technology Inc.
//
// Licensed under the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>.
// This file may not be copied, modified, or distributed
// except according to those terms.

'use strict';

var poll = {
    pollPeriod: 2000,
    commandStatus: function(client, commandId, deferred, initialTimeStamp, statusCallback) {
         var intervalId = setInterval(function() {
             client.commandsStatus(commandId)
             .then( function(res) {
                if(!res.body) {
                  throw 'Incorrectly formatted response from commandsStatus -- response must have a body';
                }
                if(res.body.error) {
                  deferred.reject({error: res.body.error});
                  return;
                }
                var finalTimeStamp = Date.now();
                if (res.body.state !== 'inProgress') {
                  deferred.resolve({ body: res.body, response: res.response, timeElapsed: (finalTimeStamp - initialTimeStamp) });
                  clearInterval(intervalId);
                } else if (typeof statusCallback === 'function') {
                  statusCallback({ body: res.body, response: res.response, error: res.error });
                }
             }, deferred.reject);
        }, this.pollPeriod);
    }
};

module.exports = poll;
