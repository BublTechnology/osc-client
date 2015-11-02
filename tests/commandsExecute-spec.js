var commandsExecute = require('../lib/commandsExecute');
var assert = require('assert');

describe("commandsExecute", function () {
  it("returns a promise", function () {
    var fakeClient = {
      serverAddress: 'http://localhost:8000'
    };
    var prom = commandsExecute.apply(fakeClient, []);
    assert(typeof prom.then === 'function');
    assert(typeof prom.catch === 'function');
  });
});
