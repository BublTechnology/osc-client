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
                 var finalTimeStamp = Date.now();
                 if (res.body.state !== 'inProgress') {
                     deferred.resolve({ body: res.body, response: res.response, timeElapsed: (finalTimeStamp - initialTimeStamp) });
                     clearInterval(intervalId);
                 } else if (typeof statusCallback === 'function') {
                     statusCallback({ body: res.body, response: res.response});
                 }
             }, deferred.reject);
        }, this.pollPeriod);
    }
};

module.exports = poll;
