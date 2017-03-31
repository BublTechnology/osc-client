// Copyright 2015 Bubl Technology Inc.
//
// Licensed under the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>.
// This file may not be copied, modified, or distributed
// except according to those terms.

function OscError (err) {
  this._raw = err
  this.oscCode = err.error.code
  this.oscMessage = err.error.message

  this.name = 'OscError'
  this.message = `${this._raw.name} failed with ${this.oscCode}: ${this.oscMessage}`
}

OscError.prototype = new Error()

module.exports = OscError
