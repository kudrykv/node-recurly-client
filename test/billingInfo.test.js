var _ = require('lodash');
var request = require('request');
var assert = require('assert');
var nock = require('nock');

var Recurly = require('../index');
var keys = require('./keys');
var client = new Recurly(keys);
var data = require('./billingInfo.data');
var json2xml = require('../lib/utils/json2xml');
var rNock = nock('https://' + keys.subdomain + '.recurly.com').defaultReplyHeaders({
  'Content-Type': 'application/xml'
});

var validateGenericSuccessfulResponse = require('./utils/validateGenericSuccessfulResponse');
var validateGenericFailureResponse = require('./utils/validateGenericFailureResponse');

describe('Billing info', function () {
  beforeEach(function () {
    nock.cleanAll();
  });

  afterEach(function () {
    assert(rNock.isDone(), 'Nock has not been called.');
  });

  it('should create billing info', function create (done) {
    var body = {token_id: 'billing-token'};
    rNock.post('/v2/accounts/deadbeef/billing_info', json2xml('billing_info', body)).reply(200, data.billingInfo.xml);

    client.billingInfo.create('deadbeef', body, _.partialRight(validateGenericSuccessfulResponse, data.billingInfo.json, done));
  });

  it('should lookup for billing info', function lookup (done) {
    rNock.get('/v2/accounts/deadbeef/billing_info').reply(200, data.billingInfo.xml);

    client.billingInfo.lookup('deadbeef', _.partialRight(validateGenericSuccessfulResponse, data.billingInfo.json, done));
  });

  it('should update billing info', function update (done) {
    var body = {token_id: 'billing-token'};
    rNock.put('/v2/accounts/deadbeef/billing_info', json2xml('billing_info', body)).reply(200, data.billingInfo.xml);

    client.billingInfo.update('deadbeef', body, _.partialRight(validateGenericSuccessfulResponse, data.billingInfo.json, done));
  });

  it('should clear billing info', function clear (done) {
    rNock.delete('/v2/accounts/deadbeef/billing_info').reply(204);

    client.billingInfo.clear('deadbeef', function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      done();
    });
  });
});
