// Copyright 2015 Bubl Technology Inc.
//
// Licensed under the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>.
// This file may not be copied, modified, or distributed
// except according to those terms.

'use strict';

var OscClient = require('./lib/OscClient');
var BublOscClient = require('./lib/BublOscClient')
var Osc2Client = require('./lib/Osc2Client')

module.exports = {
  OscClient: OscClient,
  BublOscClient: BublOscClient,
  Osc2Client: Osc2Client
};
