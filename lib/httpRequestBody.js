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
