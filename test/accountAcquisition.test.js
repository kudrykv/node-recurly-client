var _ = require('lodash');
var assert = require('assert');

var Recurly = require('../index');
var keys = require('./keys');
var client = new Recurly(keys);

var validateGenericSuccessfulResponse = require('./utils/validateGenericSuccessfulResponse');
var validateGenericFailureResponse = require('./utils/validateGenericFailureResponse');

describe('Account Acquisition', function () {
  var accountCode, email;

  before(function (done) {
    accountCode = 'deadbeef' + Date.now();
    email = accountCode + '@dummy.com';

    client.accounts.create({
      account_code: accountCode,
      email: email
    }, _.partialRight(validateGenericSuccessfulResponse, 'account', done))
  });

  it('should fail to create account acquisition', function account404 (done) {
    client.accountAcquisition.create(accountCode + '404', {}, _.partialRight(validateGenericFailureResponse, done));
  });

  it('should create account acquisition', function accountAcquisition (done) {
    client.accountAcquisition.create(accountCode, {}, _.partialRight(validateGenericSuccessfulResponse, 'account_acquisition', done));
  });

  it('should lookup account acquisition', function lookupAccountAcquisition (done) {
    client.accountAcquisition.lookup(accountCode, _.partialRight(validateGenericSuccessfulResponse, 'account_acquisition', done));
  });

  it('should update account acquisition', function accountAcquisition (done) {
    client.accountAcquisition.update(accountCode, {}, _.partialRight(validateGenericSuccessfulResponse, 'account_acquisition', done));
  });

  it('should clear account acquisition', function accountAcquisition (done) {
    client.accountAcquisition.clear(accountCode, {}, function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      done();
    });
  });
});
