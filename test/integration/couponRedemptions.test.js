var _ = require('lodash');
var assert = require('assert');
var nock = require('nock');

var Recurly = require('../../index');
var keys = require('./keys');
var client = new Recurly(keys);
var data = require('./couponRedemptions.data');
var json2xml = require('../../lib/utils/json2xml');
var rNock = nock('https://' + keys.subdomain + '.recurly.com').defaultReplyHeaders({
  'Content-Type': 'application/xml'
});

var validateGenericSuccessfulResponse = require('./utils/validateGenericSuccessfulResponse');
var validateGenericFailureResponse = require('./utils/validateGenericFailureResponse');

describe('Coupon redemptions', function () {
  it('should get account redemptions', function account (done) {
    rNock.get('/v2/accounts/deadbeef/redemptions').reply(200, data.list.xml);

    client.couponRedemptions.account('deadbeef', _.partialRight(validateGenericSuccessfulResponse, data.list.json, done));
  });

  it('should get one specific coupon redeemed on the account', function one (done) {
    rNock.get('/v2/accounts/deadbeef/redemptions/374a1c75374bd81493a3f7425db0a2b8').reply(200, data.single.xml);

    client.couponRedemptions.coupon('deadbeef', '374a1c75374bd81493a3f7425db0a2b8', _.partialRight(validateGenericSuccessfulResponse, data.single.json, done));
  });

  it('should get invoice redemptions', function account (done) {
    rNock.get('/v2/invoices/1234567890/redemptions').reply(200, data.list.xml);

    client.couponRedemptions.invoice('1234567890', _.partialRight(validateGenericSuccessfulResponse, data.list.json, done));
  });

  it('should get invoice redemptions', function account (done) {
    rNock.get('/v2/invoices/1234567890/redemptions').reply(200, data.list.xml);

    client.couponRedemptions.invoice('1234567890', _.partialRight(validateGenericSuccessfulResponse, data.list.json, done));
  });

  it('should get subscription redemptions', function account (done) {
    rNock.get('/v2/subscriptions/uuid/redemptions').reply(200, data.list.xml);

    client.couponRedemptions.subscription('uuid', _.partialRight(validateGenericSuccessfulResponse, data.list.json, done));
  });

  it('should redeem the coupon', function redeem (done) {
    rNock.post('/v2/coupons/special/redeem', json2xml('redemption', {})).reply(201, data.single.xml);

    client.couponRedemptions.redeem('special', _.partialRight(validateGenericSuccessfulResponse, data.single.json, done));
  });

  it('should delete coupon redemption', function one (done) {
    rNock.delete('/v2/accounts/deadbeef/redemptions/374a1c75374bd81493a3f7425db0a2b8').reply(204);

    client.couponRedemptions.remove('deadbeef', '374a1c75374bd81493a3f7425db0a2b8', function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      done();
    });
  });

  beforeEach(function () {
    nock.cleanAll();
  });

  afterEach(function () {
    assert(rNock.isDone(), 'Nock has not been called.');
  });
});