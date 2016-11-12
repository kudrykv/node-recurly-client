var _ = require('lodash');
var assert = require('assert');

var Recurly = require('../index');
var keys = require('./keys');
var client = new Recurly(keys);

var validateGenericSuccessfulResponse = require('./utils/validateGenericSuccessfulResponse');
var validateGenericFailureResponse = require('./utils/validateGenericFailureResponse');

describe('Coupons', function () {
  var singleCoupon = {
    coupon_code: 'deadbeef' + Date.now(),
    name: 'Coupon for testing purposes',
    discount_type: 'dollars',
    discount_in_cents: {
      USD: 101
    }
  };
  var bulkCouponCode = {
    coupon_code: 'deadbeef_bulk' + Date.now(),
    config: {
      number_of_unique_codes: 3
    }
  };

  after(function (done) {
    client.coupons.expire(singleCoupon.coupon_code, done);
  });

  it('should list coupons', function list (done) {
    client.coupons.list(_.partialRight(validateGenericSuccessfulResponse, 'coupons', done));
  });

  it('should create an coupon', function create (done) {
    client.coupons.create(singleCoupon, _.partialRight(validateGenericSuccessfulResponse, 'coupon', done));
  });

  it('should lookup the coupon', function lookup (done) {
    client.coupons.lookup(singleCoupon.coupon_code, _.partialRight(validateGenericSuccessfulResponse, 'coupon', done));
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
    client.coupons.expire(singleCoupon.coupon_code, function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);

      done();
    });
  });

  it('should restore the coupon', function restore (done) {
    client.coupons.restore(singleCoupon.coupon_code, _.partialRight(validateGenericSuccessfulResponse, 'coupon', done));
  });

  it('should edit the coupon', function edit (done) {
    client.coupons.edit(singleCoupon.coupon_code, _.partialRight(validateGenericSuccessfulResponse, 'coupon', done));
  });

  it.skip('should list unique coupon codes', function listUnique (done) {
    client.coupons.listUnique(bulkCouponCode.coupon_code, _.partialRight(validateGenericSuccessfulResponse, 'coupon', done));
  });
});
