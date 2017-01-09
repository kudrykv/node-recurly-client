var _ = require('lodash');
var assert = require('assert');
var nock = require('nock');

var Recurly = require('../../index');
var keys = require('./keys');
var client = new Recurly(keys);
var data = require('./accounts.data.js');
var json2xml = require('../../lib/utils/json2xml');
var rNock = nock('https://' + keys.subdomain + '.recurly.com').defaultReplyHeaders({
  'Content-Type': 'application/xml'
});

var validateGenericSuccessfulResponse = require('./utils/validateGenericSuccessfulResponse');
var validateGenericFailureResponse = require('./utils/validateGenericFailureResponse');

describe('Accounts', function () {
  beforeEach(function () {
    nock.cleanAll();
  });

  afterEach(function () {
    assert(rNock.isDone(), 'Nock has not been called.');
  });

  it('should fail because of no callback', function noCallback (done) {
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
    rNock.post('/v2/accounts').reply(422, data.badData.xml);

    client.accounts.create({}, _.partialRight(validateGenericFailureResponse, data.badData.json, done));
  });

  it('should create an account', function createAccount (done) {
    rNock.post('/v2/accounts', json2xml('account', data.requests.create)).reply(201, data.account.xml);

    client.accounts.create(data.requests.create, _.partialRight(validateGenericSuccessfulResponse, data.account.json, done));
  });

  it('should fail because URI is incomplete', function incompleteUrl (done) {
    client.accounts.lookup(function (err, random) {
      if (!err) {
        return done('Error had to happen: ' + JSON.stringify(random));
      }

      console.log(err);
      done();
    });
  });

  it('should get specific account', function getAccount (done) {
    rNock.get('/v2/accounts/' + data.requests.create.account_code).reply(200, data.account.xml);

    client.accounts.lookup(data.requests.create.account_code, _.partialRight(validateGenericSuccessfulResponse, data.account.json, done));
  });

  it('should 404 for unknown account code', function getUnknownAccount (done) {
    rNock.get('/v2/accounts/unknown').reply(404, data.unknown.xml);

    client.accounts.lookup('unknown', _.partialRight(validateGenericFailureResponse, data.unknown.json, done));
  });

  it('should get list of accounts without passing additional parameters', function listWithoutParameters (done) {
    rNock.get('/v2/accounts').reply(200, data.accounts.xml);

    client.accounts.list(_.partialRight(validateGenericSuccessfulResponse, data.accounts.json, done));
  });

  it('should get list of accounts understanding additional parameters', function listWithParameters (done) {
    rNock.get('/v2/accounts?state=active').reply(200, data.accounts.xml);

    client.accounts.list({state: 'active'}, _.partialRight(validateGenericSuccessfulResponse, data.accounts.json, done));
  });

  it('should fail close 404 account', function close404Account (done) {
    rNock.delete('/v2/accounts/unknown').reply(404, data.unknown.xml);

    client.accounts.close('unknown', _.partialRight(validateGenericFailureResponse, data.unknown.json, done));
  });

  it('should close the account', function closeAccount (done) {
    rNock.delete('/v2/accounts/deadbeef').reply(204);

    client.accounts.close('deadbeef', function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      done();
    });
  });

  it('should fail reopen 404 account', function reopen404Account (done) {
    rNock.put('/v2/accounts/unknown/reopen', json2xml('account', {})).reply(404, data.unknown.xml);

    client.accounts.reopen('unknown', _.partialRight(validateGenericFailureResponse, data.unknown.json, done));
  });

  it('should reopen closed account', function reopenAccount (done) {
    rNock.put('/v2/accounts/deadbeef/reopen', json2xml('account', {})).reply(200, data.account.xml);

    client.accounts.reopen('deadbeef', _.partialRight(validateGenericSuccessfulResponse, data.account.json, done));
  });

  it('should fail getting balance because of 404', function getBalanceFrom404 (done) {
    rNock.get('/v2/accounts/unknown/balance').reply(404, data.unknown.xml);

    client.accounts.balance('unknown', _.partialRight(validateGenericFailureResponse, data.unknown.json, done));
  });

  it('should get account balance', function getBalance (done) {
    rNock.get('/v2/accounts/deadbeef/balance').reply(200, data.balance.xml);

    client.accounts.balance('deadbeef', _.partialRight(validateGenericSuccessfulResponse, data.balance.json, done));
  });

  it('should fail getting notes because of 404', function getNotes404 (done) {
    rNock.get('/v2/accounts/unknown/notes').reply(404, data.unknown.xml);

    client.accounts.notes('unknown', _.partialRight(validateGenericFailureResponse, data.unknown.json, done));
  });

  it('should get notes', function getNotes (done) {
    rNock.get('/v2/accounts/deadbeef/notes').reply(200, data.notes.xml);

    client.accounts.notes('deadbeef', _.partialRight(validateGenericSuccessfulResponse, data.notes.json, done));
  });
});
