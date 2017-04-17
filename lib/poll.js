// Copyright 2015 Bubl Technology Inc.
//
// Licensed under the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>.
// This file may not be copied, modified, or distributed
// except according to those terms.

'use strict'

var OscError = require('./OscError')

var poll = {
  pollPeriod: 2000,
  commandStatus: function (client, commandId, deferred, initialTimeStamp, statusCallback) {
    var intervalId = setInterval(function () {
      client.commandsStatus(commandId)
        .then(function (res) {
          if (!res) {
            deferred.reject(new Error('CommandStatus wrong response format -- response must have a body'))
          } else if (res.state === 'error') {
            deferred.reject(new OscError(res))
          } else if (res.state !== 'inProgress') {
            deferred.resolve(res)
          } else {
            if (typeof statusCallback === 'function') {
              statusCallback(res)
            }
            return
          }
          clearInterval(intervalId)
        }, deferred.reject)
    }, this.pollPeriod)
  }
}

module.exports = poll
