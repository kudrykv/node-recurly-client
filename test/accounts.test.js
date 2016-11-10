var _ = require('lodash');
var assert = require('assert');

var Recurly = require('../index');
var keys = require('./keys');
var client = new Recurly(keys);

describe('Accounts', function () {
  var accountCode, email;

  before(function () {
    accountCode = 'deadbeef' + Date.now();
    email = accountCode + '@dummy.com';
  });

  it('should fail creating an account', function tryToCreateBrokenAccount (done) {
    client.accounts.create({}, function (err) {
      if (!err) { return done(new Error('We should have an error, user created instead')); }

      assert(err.headers);
      assert(err.error || err.errors);
      done();
    })
  });

  it('should create an account', function createAccount (done) {
    client.accounts.create({
      account_code: accountCode,
      email: email
    }, function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      assert(pack.account);
      done();
    });
  });

  it('should get specific account', function getAccount (done) {
    client.accounts.lookup(accountCode, function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      //noinspection JSUnresolvedVariable
      assert(pack.account);
      done();
    });
  });

  it('should 404 for unknown account code', function getUnknownAccount (done) {
    client.accounts.lookup(accountCode + '111', function (err) {
      if (!err) { return done(new Error('We should not find anything')); }

      assert(err.error);
      assert(err.headers);
      done();
    });
  });

  it('should get list of accounts without passing additional parameters', function listWithoutParameters (done) {
    client.accounts.list(function (err, pack) {
      if (err) {return done(err); }

      assert(pack.headers);
      assert(pack.accounts);
      done();
    });
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
    client.accounts.close(accountCode + '404', function (err) {
      if (!err) { return done(new Error('Error had to occur, but account was closed instead: ' + accountCode)); }

      assert(err.headers);
      assert(err.error || err.errors);
      done();
    });
  });

  it('should close the account', function closeAccount (done) {
    client.accounts.close(accountCode, function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      done();
    });
  });

  it('should fail reopen 404 account', function reopen404Account (done) {
    client.accounts.reopen(accountCode + '404', function (err) {
      if (!err) { return done(new Error('Error had to occur, but account was reopened instead: ' + accountCode)); }

      assert(err.headers);
      assert(err.error || err.errors);
      done();
    });
  });

  it('should reopen closed account', function reopenAccount (done) {
    client.accounts.reopen(accountCode, function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      assert(pack.account);
      done();
    });
  });

  it('should fail getting balance because of 404', function getBalanceFrom404 (done) {
    client.accounts.balance(accountCode + '404', function (err) {
      if (!err) { return done(new Error('Error had to occur, balance got instead for ' + accountCode)); }

      assert(err.headers);
      assert(err.error || err.errors);
      done();
    });
  });

  it('should get account balance', function getBalance (done) {
    client.accounts.balance(accountCode, function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      assert(pack.account_balance);
      done();
    });
  });

  it('should fail getting notes because of 404', function getNotes404 (done) {
    client.accounts.notes(accountCode + '404', function (err) {
      if (!err) { return done(new Error('Error had to occur, got notes instead for ' + accountCode)); }

      assert(err.headers);
      assert(err.error || err.errors);
      done();
    });
  });

  it('should get notes', function getNotes (done) {
    client.accounts.notes(accountCode, function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      assert(pack.notes);
      done();
    });
  });
});