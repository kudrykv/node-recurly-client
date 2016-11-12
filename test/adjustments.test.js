var _ = require('lodash');
var assert = require('assert');

var Recurly = require('../index');
var keys = require('./keys');
var client = new Recurly(keys);

var validateGenericSuccessfulResponse = require('./utils/validateGenericSuccessfulResponse');
var validateGenericFailureResponse = require('./utils/validateGenericFailureResponse');

describe('Account Acquisition', function () {
  var accountCode, email, uuid;

  before(function (done) {
    accountCode = 'deadbeef' + Date.now();
    email = accountCode + '@dummy.com';

    client.accounts.create({
      account_code: accountCode,
      email: email
    }, _.partialRight(validateGenericSuccessfulResponse, 'account', done))
  });

  it('should list account adjustments', function list (done) {
    client.adjustments.list(accountCode, _.partialRight(validateGenericSuccessfulResponse, 'adjustments', done));
  });

  it('should create a charge', function create (done) {
    client.adjustments.create(accountCode, {
      currency: keys.currency,
      unit_amount_in_cents: 300
    }, _.partialRight(validateGenericSuccessfulResponse, 'adjustment', done));
  });

  it('should lookup an adjustment', function lookup (done) {
    client.adjustments.create(accountCode, {
      currency: keys.currency,
      unit_amount_in_cents: 300
    }, _.partialRight(validateGenericSuccessfulResponse, 'adjustment', function (err, pack) {
      if (err) { return done(err); }

      uuid = pack.adjustment.uuid;

      client.adjustments.lookup(uuid, _.partialRight(validateGenericSuccessfulResponse, 'adjustment', done));
    }))
  });

  it('should delete an adjustment', function destroy (done) {
    client.adjustments.delete(uuid, function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      done();
    });
  });
});
