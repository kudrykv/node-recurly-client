var assert = require('assert');

describe('Dummy test', function () {
  it('should check whether needed env variables exist', function testEnvNames () {
    assert.notEqual(process.env.API_KEY, '', 'API_KEY not set');
    assert.notEqual(process.env.SUBDOMAIN, '', 'SUBDOMAIN not set');
  });
});