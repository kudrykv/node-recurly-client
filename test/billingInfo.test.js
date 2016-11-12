var _ = require('lodash');
var request = require('request');
var assert = require('assert');

var Recurly = require('../index');
var keys = require('./keys');
var client = new Recurly(keys);

var validateGenericSuccessfulResponse = require('./utils/validateGenericSuccessfulResponse');
var validateGenericFailureResponse = require('./utils/validateGenericFailureResponse');

describe('Billing info', function () {
  var accountCode, email, tokenId;

  before(function (done) {
    accountCode = 'deadbeef' + Date.now();
    email = accountCode + '@dummy.com';

    client.accounts.create({
      account_code: accountCode,
      email: email
    }, _.partialRight(validateGenericSuccessfulResponse, 'account', function () {
      request(
        'https://api.recurly.com/js/v1/token' +
        '?first_name=Jon&last_name=Snow' +
        '&number=4111111111111111&year=2018&month=06&cvv=123' +
        '&address1=The%20North&address2=Castle' +
        '&city=Hope&state=WA&country=US&postal_code=98552' +
        '&vat_number=SE0000&version=3.1.1' +
        '&key=' + keys.publicKey,

        function (error, response, body) {
          if (error) { return done(error); }

          if (response.statusCode === 200) {
            tokenId = _.get(JSON.parse(body), 'id');
            done();
          }
        }
      );
    }));
  });

  it('should create billing info', function create (done) {
    client.billingInfo.create(accountCode, {
      token_id: tokenId
    }, _.partialRight(validateGenericSuccessfulResponse, 'billing_info', done));
  });

  it('should lookup for billing info', function lookup (done) {
    client.billingInfo.lookup(accountCode, _.partialRight(validateGenericSuccessfulResponse, 'billing_info', done));
  });

  it('should update billing info', function update (done) {
    client.billingInfo.update(accountCode, {
      token_id: tokenId
    }, _.partialRight(validateGenericSuccessfulResponse, 'billing_info', done));
  });

  it('should clear billing info', function clear (done) {
    client.billingInfo.clear(accountCode, function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      done();
    });
  });
});
