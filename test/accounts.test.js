var assert = require('assert');

var Recurly = require('../index');
var keys = require('./keys');
var client = new Recurly(keys);

describe('Accounts', function () {
  it('should get specific account', function (done) {
    client.accounts.lookup('deadbeef', function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      assert(pack.account);
      done();
    });
  });
});