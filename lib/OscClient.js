// Copyright 2015 Bubl Technology Inc.
//
// Licensed under the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>.
// This file may not be copied, modified, or distributed
// except according to those terms.

var makeHttpRequest = require('./makeHttpRequest')
var commandsExecute = require('./commandsExecute')

var OscClient = function (domainArg, portArg) {
  'use strict'
  var domain = domainArg || 'localhost'
  var port = portArg || 8000

  this.serverAddress = 'http://' + domain + ':' + port

  // HTTP CONTENT TYPES
  this.applicationJsonType = 'application/json; charset=utf-8'
  this.applicationOctetType = 'application/octet-stream'

  // OSC INFO
  var infoUrl = this.serverAddress + '/osc/info'

  this.getInfo = function () {
    return makeHttpRequest('GET', infoUrl, this.applicationJsonType)
  }

  // OSC STATE
  var stateUrl = this.serverAddress + '/osc/state'

  this.getState = function () {
    return makeHttpRequest('POST', stateUrl, this.applicationJsonType)
  }

  // OSC CHECK FOR UPDATES
  var checkForUpdatesUrl = this.serverAddress + '/osc/checkForUpdates'

  this.checkForUpdates = function (stateFingerprint, waitTimeout) {
    return makeHttpRequest('POST', checkForUpdatesUrl, this.applicationJsonType, {
      stateFingerprint: stateFingerprint,
      waitTimeout: waitTimeout
    })
  }

  // OSC COMMANDS START SESSION
  this.startSession = function (timeout) {
    return commandsExecute.apply(this, ['camera.startSession', { timeout: timeout }])
  }

  // OSC COMMANDS UPDATE SESSION
  this.updateSession = function (sessionId, timeout) {
    return commandsExecute.apply(this, ['camera.updateSession', { sessionId: sessionId, timeout: timeout }])
  }

  // OSC COMMANDS CLOSE SESSION
  this.closeSession = function (sessionId) {
    return commandsExecute.apply(this, ['camera.closeSession', { sessionId: sessionId }])
  }

  // OSC COMMANDS TAKE PICTURE
  this.takePicture = function (sessionId, statusCallback) {
    return commandsExecute.apply(this, ['camera.takePicture', { sessionId: sessionId }, statusCallback])
  }

  // OSC COMMANDS LIST IMAGES
  this.listImages = function (entryCount, includeThumb, maxSize, continuationToken) {
    return commandsExecute.apply(this, ['camera.listImages', {
      entryCount: entryCount,
      includeThumb: includeThumb,
      maxSize: maxSize,
      continuationToken: continuationToken
    }])
  }

  // OSC COMMANDS DELETE
  this.delete = function (fileUri) {
    return commandsExecute.apply(this, ['camera.delete', { fileUri: fileUri }])
  }

  // OSC COMMANDS GET IMAGE
  this.getImage = function (fileUri, maxSize) {
    return commandsExecute.apply(this, ['camera.getImage', { fileUri: fileUri, maxSize: maxSize }])
  }

  // OSC COMMANDS GET METADATA
  this.getMetadata = function (fileUri) {
    return commandsExecute.apply(this, ['camera.getMetadata', { fileUri: fileUri }])
  }

  // OSC COMMANDS SET OPTIONS
  this.setOptions = function (sessionId, options) {
    return commandsExecute.apply(this, ['camera.setOptions', { sessionId: sessionId, options: options }])
  }

  // OSC COMMANDS GET OPTIONS
  this.getOptions = function (sessionId, optionNames) {
    return commandsExecute.apply(this, ['camera.getOptions', { sessionId: sessionId, optionNames: optionNames }])
  }

  // OSC COMMANDS STATUS
  var commandsStatusUrl = this.serverAddress + '/osc/commands/status'

  this.commandsStatus = function (commandId) {
    return makeHttpRequest('POST', commandsStatusUrl, this.applicationJsonType, { id: commandId })
  }
}

module.exports = OscClient
