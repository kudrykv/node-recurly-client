var _ = require('lodash');
var assert = require('assert');
var nock = require('nock');

var Recurly = require('../../index');
var keys = require('./keys');
var client = new Recurly(keys);
var data = require('./coupons.data');
var json2xml = require('../../lib/utils/json2xml');
var rNock = nock('https://' + keys.subdomain + '.recurly.com').defaultReplyHeaders({
  'Content-Type': 'application/xml'
});

var validateGenericSuccessfulResponse = require('./utils/validateGenericSuccessfulResponse');
var validateGenericFailureResponse = require('./utils/validateGenericFailureResponse');

describe('Coupons', function () {
  var singleCoupon = {
    coupon_code: 'deadbeef',
    name: 'Coupon for testing purposes',
    discount_type: 'percent',
    discount_percent: 10
  };

  beforeEach(function () {
    nock.cleanAll();
  });

  afterEach(function () {
    assert(rNock.isDone(), 'Nock has not been called.');
  });

  it('should list coupons', function list (done) {
    rNock.get('/v2/coupons').reply(200, data.coupons.xml);

    client.coupons.list(_.partialRight(validateGenericSuccessfulResponse, data.coupons.json, done));
  });

  it('should create an coupon', function create (done) {
    rNock.post('/v2/coupons', json2xml('coupon', singleCoupon)).reply(201, data.coupon.xml);

    client.coupons.create(singleCoupon, _.partialRight(validateGenericSuccessfulResponse, data.coupon.json, done));
  });

  it('should lookup the coupon', function lookup (done) {
    rNock.get('/v2/coupons/deadbeef').reply(200, data.coupon.xml);

    client.coupons.lookup(singleCoupon.coupon_code, _.partialRight(validateGenericSuccessfulResponse, data.coupon.json, done));
  });

  it.skip('should generate unique codes', function generate (done) {
    client.coupons.generate(bulkCouponCode.coupon_code, bulkCouponCode.config, function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);

      console.log(JSON.stringify(pack, null, 2));

      done();
    });
  });

  it('should expire the coupon', function expire (done) {
    rNock.delete('/v2/coupons/deadbeef').reply(204);

    client.coupons.expire('deadbeef', function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);

      done();
    });
  });

  it('should restore the coupon', function restore (done) {
    rNock.put('/v2/coupons/deadbeef/restore').reply(200, data.coupon.xml);

    client.coupons.restore(singleCoupon.coupon_code, _.partialRight(validateGenericSuccessfulResponse, data.coupon.json, done));
  });

  it('should edit the coupon', function edit (done) {
    var body = {name: 'Coupon for testing purposes'};
    rNock.put('/v2/coupons/deadbeef', json2xml('coupon', body)).reply(200, data.coupon.xml);

    client.coupons.edit('deadbeef', body, _.partialRight(validateGenericSuccessfulResponse, data.coupon.json, done));
  });

  it.skip('should list unique coupon codes', function listUnique (done) {
    client.coupons.listUnique(bulkCouponCode.coupon_code, _.partialRight(validateGenericSuccessfulResponse, data.coupon.json, done));
  });
});
