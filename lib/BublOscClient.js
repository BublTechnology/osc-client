// Copyright 2015 Bubl Technology Inc.
//
// Licensed under the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>.
// This file may not be copied, modified, or distributed
// except according to those terms.

'use strict'

var OscClient = require('./Osc2Client')
var makeHttpRequest = require('./makeHttpRequest')
var commandsExecute = require('./commandsExecute')

var BublOscClient = function () {
  this.constructor.apply(this, Array.prototype.slice.call(arguments))
}

BublOscClient.prototype = new OscClient()

/*********************************************************/
/* Bubl's Vendor Specific Endpoints and Commands         */
/*********************************************************/

// OSC BUBL UPDATE
BublOscClient.prototype.bublUpdate = function (updateFileBin) {
  var bublUpdateUrl = this.serverAddress + '/osc/_bublUpdate'
  return makeHttpRequest('POST', bublUpdateUrl, this.applicationOctetType, updateFileBin)
}

// OSC BUBL GET IMAGE
BublOscClient.prototype.bublGetImage = function (fileUri) {
  var bublGetImageUrl = this.serverAddress + '/osc/_bublGetImage/'
  return makeHttpRequest('GET', bublGetImageUrl + encodeURIComponent(fileUri), this.applicationJsonType)
}

// BUBL STOP
BublOscClient.prototype.bublStop = function (commandId) {
  var bublStopUrl = this.serverAddress + '/osc/commands/_bublStop'
  return makeHttpRequest('POST', bublStopUrl, this.applicationJsonType, { id: commandId })
}

// BUBL POLL
BublOscClient.prototype.bublPoll = function (commandId, fingerprint, waitTimeout) {
  var bublPollUrl = this.serverAddress + '/osc/commands/_bublPoll'
  return makeHttpRequest('POST', bublPollUrl, this.applicationJsonType, {
    id: commandId,
    fingerprint: fingerprint,
    waitTimeout: waitTimeout
  })
}

// BUBL COMMANDS CAPTURE VIDEO
BublOscClient.prototype.bublCaptureVideo = function (sessionId, statusCallback) {
  return commandsExecute.apply(this, ['camera._bublCaptureVideo', { sessionId: sessionId }, statusCallback])
}

// OSC COMMANDS BUBL TIMELAPSE
BublOscClient.prototype.bublTimelapse = function (sessionId, statusCallback) {
  return commandsExecute.apply(this, ['camera._bublTimelapse', { sessionId: sessionId }, statusCallback])
}

// OSC COMMANDS BUBL STREAM
BublOscClient.prototype.bublStream = function (sessionId, statusCallback) {
  return commandsExecute.apply(this, ['camera._bublStream', { sessionId: sessionId }, statusCallback])
}

// OSC COMMANDS BUBL SHUTDOWN
BublOscClient.prototype.bublShutdown = function (sessionId, shutdownDelay) {
  return commandsExecute.apply(this, ['camera._bublShutdown', { sessionId: sessionId, shutdownDelay: shutdownDelay }])
}

module.exports = BublOscClient
