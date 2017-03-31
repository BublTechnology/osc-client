// Copyright 2015 Bubl Technology Inc.
//
// Licensed under the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>.
// This file may not be copied, modified, or distributed
// except according to those terms.

'use strict'

var OscClient = require('./OscClient')
var commandsExecute = require('./commandsExecute')

var Osc2Client = function () {
  this.constructor.apply(this, Array.prototype.slice.call(arguments))
}

Osc2Client.prototype = new OscClient()

/*********************************************************/
/* OSC Level 2 Commands Endpoints                        */
/*********************************************************/

// OSC2 COMMAND RESET
Osc2Client.prototype.reset = function () {
  return commandsExecute.apply(this, ['camera.reset'])
}

// OSC2 COMMAND LISTFILES
Osc2Client.prototype.listFiles = function (fileType, entryCount, maxThumbSize, startPosition) {
  return commandsExecute.apply(this, ['camera.listFiles', {
    fileType: fileType,
    entryCount: entryCount,
    maxThumbSize: maxThumbSize,
    startPosition: startPosition
  }])
}

// OSC2 COMMAND STARTCAPTURE
Osc2Client.prototype.startCapture = function (statusCallback) {
  return commandsExecute.apply(this, ['camera.startCapture', {}, statusCallback])
}

// OSC2 COMMAND STOPCAPTURE
Osc2Client.prototype.stopCapture = function () {
  return commandsExecute.apply(this, ['camera.stopCapture'])
}

// OSC2 COMMAND DELETE2
Osc2Client.prototype.delete2 = function (fileUrls) {
  return commandsExecute.apply(this, ['camera.delete', { fileUrls: fileUrls }])
}

module.exports = Osc2Client
