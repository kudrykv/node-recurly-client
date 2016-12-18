var _ = require('lodash');
var assert = require('assert');

var Recurly = require('../index');
var keys = require('./keys');
var client = new Recurly(keys);

var validateGenericSuccessfulResponse = require('./utils/validateGenericSuccessfulResponse');
var validateGenericFailureResponse = require('./utils/validateGenericFailureResponse');

describe('Accounts', function () {
  var accountCode, email;

  before(function () {
    accountCode = 'deadbeef' + Date.now();
    email = accountCode + '@dummy.com';
  });

  it('should fail because of no callback', function (done) {
    try {
      client.accounts.create({});
      done('No callback was passed, but we got hang out.');
    } catch (e) {
      if (e) {
        return done();
      }

      done('Weird things happen!');
    }
  });

  it('should fail creating an account', function tryToCreateBrokenAccount (done) {
    client.accounts.create({}, _.partialRight(validateGenericFailureResponse, done));
  });

  it('should create an account', function createAccount (done) {
    client.accounts.create({
      account_code: accountCode,
      email: email
    }, _.partialRight(validateGenericSuccessfulResponse, 'account', done));
  });

  it('should fail because URI is incomplete', function (done) {
    client.accounts.lookup(function (err, random) {
      if (!err) {
        return done('Error had to happen: ' + JSON.stringify(random));
      }

      console.log(err);
      done();
    });
  });

  it('should get specific account', function getAccount (done) {
    client.accounts.lookup(accountCode, _.partialRight(validateGenericSuccessfulResponse, 'account', done));
  });

  it('should 404 for unknown account code', function getUnknownAccount (done) {
    client.accounts.lookup(accountCode + '111', _.partialRight(validateGenericFailureResponse, done));
  });

  it('should get list of accounts without passing additional parameters', function listWithoutParameters (done) {
    client.accounts.list(_.partialRight(validateGenericSuccessfulResponse, 'accounts', done));
  });

  it('should get list of accounts understanding additional parameters', function listWithParameters (done) {
    client.accounts.list({
      state: 'active'
    }, function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      assert(pack.accounts);

      _.forEach([].concat(pack.accounts.account), function (account) {
        //noinspection NodeModulesDependencies
        assert(account.state, 'active', 'Account has to be active due to filter rules: ' + JSON.stringify(account));
      });

      done();
    });
  });

  it('should fail close 404 account', function close404Account (done) {
    client.accounts.close(accountCode + '404', _.partialRight(validateGenericFailureResponse, done));
  });

  it('should close the account', function closeAccount (done) {
    client.accounts.close(accountCode, function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      done();
    });
  });

  it('should fail reopen 404 account', function reopen404Account (done) {
    client.accounts.reopen(accountCode + '404', _.partialRight(validateGenericFailureResponse, done));
  });

  it('should reopen closed account', function reopenAccount (done) {
    client.accounts.reopen(accountCode, _.partialRight(validateGenericSuccessfulResponse, 'account', done));
  });

  it('should fail getting balance because of 404', function getBalanceFrom404 (done) {
    client.accounts.balance(accountCode + '404', _.partialRight(validateGenericFailureResponse, done));
  });

  it('should get account balance', function getBalance (done) {
    client.accounts.balance(accountCode, _.partialRight(validateGenericSuccessfulResponse, 'account_balance', done));
  });

  it('should fail getting notes because of 404', function getNotes404 (done) {
    client.accounts.notes(accountCode + '404', _.partialRight(validateGenericFailureResponse, done));
  });

  it('should get notes', function getNotes (done) {
    client.accounts.notes(accountCode, _.partialRight(validateGenericSuccessfulResponse, 'notes', done));
  });
});
