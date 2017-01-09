var _ = require('lodash');
var assert = require('assert');
var nock = require('nock');

var Recurly = require('../../index');
var keys = require('./keys');
var client = new Recurly(keys);
var data = require('./adjustments.data.js');
var json2xml = require('../../lib/utils/json2xml');
var rNock = nock('https://' + keys.subdomain + '.recurly.com').defaultReplyHeaders({
  'Content-Type': 'application/xml'
});

var validateGenericSuccessfulResponse = require('./utils/validateGenericSuccessfulResponse');
var validateGenericFailureResponse = require('./utils/validateGenericFailureResponse');

describe('Account Acquisition', function () {
  beforeEach(function () {
    nock.cleanAll();
  });

  afterEach(function () {
    assert(rNock.isDone(), 'Nock has not been called.');
  });

  it('should list account adjustments', function list (done) {
    rNock.get('/v2/accounts/deadbeef/adjustments').reply(200, data.adjustments.xml);

    client.adjustments.list('deadbeef', _.partialRight(validateGenericSuccessfulResponse, data.adjustments.json, done));
  });

  it('should create a charge', function create (done) {
    var body = {
      currency: keys.currency,
      unit_amount_in_cents: 300
    };

    rNock.post('/v2/accounts/deadbeef/adjustments', json2xml('adjustment', body)).reply(200, data.charge.xml);

    client.adjustments.create('deadbeef', body, _.partialRight(validateGenericSuccessfulResponse, data.charge.json, done));
  });

  it('should lookup an adjustment', function lookup (done) {
    var uuid = '37c0031340577f993ff30b41738f52ff';
    rNock.get('/v2/adjustments/' + uuid).reply(200, data.charge.xml);

    client.adjustments.lookup(uuid, _.partialRight(validateGenericSuccessfulResponse, data.charge.json, done));
  });

  it('should delete an adjustment', function destroy (done) {
    var uuid = '37c0031340577f993ff30b41738f52ff';
    rNock.delete('/v2/adjustments/' + uuid).reply(204);

    client.adjustments.delete(uuid, function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      done();
    });
  });
});
