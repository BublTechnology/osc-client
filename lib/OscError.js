// Copyright 2015 Bubl Technology Inc.
//
// Licensed under the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>.
// This file may not be copied, modified, or distributed
// except according to those terms.

function OscError (err) {
  this.name = 'OscError'
  this.data = err
  this.error = err.error
  this.code = err.error.code
  this.message = `${err.name} failed with ${err.error.code}: ${err.error.message}`
}

OscError.prototype = new Error

module.exports = OscError
