// Copyright 2015 Bubl Technology Inc.
//
// Licensed under the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>.
// This file may not be copied, modified, or distributed
// except according to those terms.

// HTTP REQUEST BODY
var httpRequestBody = function(method, url, contentType, body) {
    'use strict';
    if (contentType !== 'application/octet-stream') {
        body = JSON.stringify(body);
    }
    return {
        method: method,
        url: url,
        body: body,
        headers: {
            'Content-Type': contentType,
            'X-XSRF-Protected': '1'
        },
        withCredentials: false,
        responseType: 'arraybuffer'
    };
};

module.exports = httpRequestBody;
