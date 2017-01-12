## osc-client

[![Build Status](https://travis-ci.org/BublTechnology/osc-client.svg)](https://travis-ci.org/BublTechnology/osc-client)

Wrapper for making requests to [Open Spherical Camera API](https://developers.google.com/streetview/open-spherical-camera/?hl=en)


### Install with NPM
```shell
npm install osc-client --save
```

### Connect and take a picture.

```javascript

const OscClientClass = require('osc-client').OscClient

let domain = '127.0.0.1'
let port = '8000'
let client = new OscClientClass(domain, port)
let sessionId

client.startSession().then((res) => client.takePicture(res.results.sessionId))
  .then((res) => client.poll(res.id))
  .then((res) => client.getImage(res.results.fileUri))
  .then((imageData) => {
    require('fs').writeFileSync('image.jpg', imageData) //<Buffer ff d8 ff ...>
    return client.closeSession(sessionId)
  }).then(() => console.log('COMPLETED'))

```
