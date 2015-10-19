// Copyright 2015 Bubl Technology Inc.
//
// Licensed under the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>.
// This file may not be copied, modified, or distributed
// except according to those terms.

'use strict';

var poll = {
    pollPeriod: 2000,
    commandStatus: function(testClient, commandId, deferred, initialTimeStamp, statusCallback) {
         var intervalId = setInterval(function() {
             testClient.commandsStatus(commandId)
             .then( function(res) {
                 var finalTimeStamp = Date.now();

                 if (res.body.state !== 'inProgress') {
                     deferred.resolve({'error': res.error, 'body': res.body, 'response': res.response, 'timeElapsed': (finalTimeStamp - initialTimeStamp)});
                     clearInterval(intervalId);
                 } else if (statusCallback !== undefined){
                     statusCallback({'error': res.err, 'body': res.body, 'response': res.response});
                 }
             });
        }, this.pollPeriod);
    }
};

module.exports = poll;
