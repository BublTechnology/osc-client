## osc-client

[![Build Status](https://travis-ci.org/BublTechnology/osc-client.svg)](https://travis-ci.org/BublTechnology/osc-client)

Wrapper for making requests to [Open Spherical Camera API](https://developers.google.com/streetview/open-spherical-camera/?hl=en)


### Install with NPM
```shell
npm install osc-client --save
```

### Connect and take a picture.

```javascript

var OscClientClass = require('osc-client').OscClient;

var domain = '127.0.0.1';
var port = '8000';
var client = new OscClientClass(domain, port);
var sessionId;

client.startSession().then(function(res){
  sessionId = res.body.results.sessionId;
  return client.takePicture(sessionId);
})
.then(function (res) {
  var pictureUri = res.body.results.fileUri;
  return client.getImage(pictureUri);
})
.then(function(res){
  var imgData = res.body; //<Buffer ff d8 ff ...>
  return client.closeSession(sessionId);
});


```
