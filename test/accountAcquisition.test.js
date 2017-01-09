var _ = require('lodash');
var assert = require('assert');
var nock = require('nock');

var Recurly = require('../index');
var keys = require('./keys');
var client = new Recurly(keys);
var data = require('./accountAcquisition.data');
var json2xml = require('../lib/utils/json2xml');
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

  it('should fail to create account acquisition', function account404 (done) {
    rNock.post('/v2/accounts/unknown/acquisition', json2xml('account_acquisition', {})).reply(404, data.unknown.xml);

    client.accountAcquisition.create('unknown', {}, _.partialRight(validateGenericFailureResponse, data.unknown.json, done));
  });

  it('should create account acquisition', function accountAcquisition (done) {
    rNock.post('/v2/accounts/deadbeef/acquisition', json2xml('account_acquisition', {})).reply(200, data.acquisition.xml);

    client.accountAcquisition.create('deadbeef', {}, _.partialRight(validateGenericSuccessfulResponse, data.acquisition.json, done));
  });

  it('should lookup account acquisition', function lookupAccountAcquisition (done) {
    rNock.get('/v2/accounts/deadbeef/acquisition').reply(200, data.acquisition.xml);

    client.accountAcquisition.lookup('deadbeef', _.partialRight(validateGenericSuccessfulResponse, data.acquisition.json, done));
  });

  it('should update account acquisition', function accountAcquisition (done) {
    rNock.put('/v2/accounts/deadbeef/acquisition', json2xml('account_acquisition', {})).reply(200, data.acquisition.xml);

    client.accountAcquisition.update('deadbeef', {}, _.partialRight(validateGenericSuccessfulResponse, data.acquisition.json, done));
  });

  it('should clear account acquisition', function accountAcquisition (done) {
    rNock.delete('/v2/accounts/deadbeef/acquisition').reply(204, data.acquisition.xml);

    client.accountAcquisition.clear('deadbeef', function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      done();
    });
  });
});
