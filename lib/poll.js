// Copyright 2015 Bubl Technology Inc.
//
// Licensed under the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>.
// This file may not be copied, modified, or distributed
// except according to those terms.

'use strict'

var poll = {
  pollPeriod: 2000,
  commandStatus: function (client, commandId, deferred, initialTimeStamp, statusCallback) {
    var intervalId = setInterval(function () {
      client.commandsStatus(commandId)
        .then(function (res) {
          if (!res) {
            deferred.reject(new Error('CommandStatus wrong response format -- response must have a body'))
            return
          }
          if (res.state !== 'inProgress') {
            deferred.resolve(res)
            clearInterval(intervalId)
          } else if (typeof statusCallback === 'function') {
            statusCallback(res)
          }
        }, deferred.reject)
    }, this.pollPeriod)
  }
}

module.exports = poll
