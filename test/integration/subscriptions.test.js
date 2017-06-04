var _ = require('lodash');
var assert = require('assert');
var nock = require('nock');

var Recurly = require('../../index');
var keys = require('./keys');
var client = new Recurly(keys);
var data = require('./subscriptions.data');
var json2xml = require('../../lib/utils/json2xml');
var rNock = nock('https://' + keys.subdomain + '.recurly.com').defaultReplyHeaders({
  'Content-Type': 'application/xml'
});

var validateGenericSuccessfulResponse = require('./utils/validateGenericSuccessfulResponse');

describe('Subscriptions', function () {
  beforeEach(function () {
    nock.cleanAll();
  });

  afterEach(function () {
    assert(rNock.isDone(), 'Nock has not been called.');
  });

  it('should list', function list (done) {
    rNock.get('/v2/accounts/deadbeef/subscriptions').reply(200, data.dummy.xml);

    client.subscriptions.list('deadbeef', _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should preview', function create (done) {
    var requestBody = json2xml('subscription', data.dummy.json.dummy);
    rNock.post('/v2/subscriptions/preview', requestBody).reply(200, data.dummy.xml);

    client.subscriptions.preview(data.dummy.json.dummy, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should create', function create (done) {
    var requestBody = json2xml('subscription', data.dummy.json.dummy);
    rNock.post('/v2/subscriptions', requestBody).reply(200, data.dummy.xml);

    client.subscriptions.create(data.dummy.json.dummy, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should lookup', function list (done) {
    rNock.get('/v2/subscriptions/deaduuid').reply(200, data.dummy.xml);

    client.subscriptions.lookup('deaduuid', _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should preview change', function create (done) {
    var requestBody = json2xml('subscription', data.dummy.json.dummy);
    rNock.post('/v2/subscriptions/deaduuid/preview', requestBody).reply(200, data.dummy.xml);

    client.subscriptions.previewChange('deaduuid', data.dummy.json.dummy, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should update', function create (done) {
    var requestBody = json2xml('subscription', data.dummy.json.dummy);
    rNock.put('/v2/subscriptions/deaduuid', requestBody).reply(200, data.dummy.xml);

    client.subscriptions.update('deaduuid', data.dummy.json.dummy, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should update notes', function create (done) {
    var requestBody = json2xml('subscription', data.dummy.json.dummy);
    rNock.put('/v2/subscriptions/deaduuid/notes', requestBody).reply(200, data.dummy.xml);

    client.subscriptions.updateNotes('deaduuid', data.dummy.json.dummy, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should cancel', function create (done) {
    rNock.put('/v2/subscriptions/deaduuid/cancel').reply(200, data.dummy.xml);

    client.subscriptions.cancel('deaduuid', _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should reactivate', function create (done) {
    rNock.put('/v2/subscriptions/deaduuid/reactivate').reply(200, data.dummy.xml);

    client.subscriptions.reactivate('deaduuid', _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should terminate', function create (done) {
    rNock.put('/v2/subscriptions/deaduuid/terminate?refund=none&charge=true').reply(200, data.dummy.xml);

    client.subscriptions.terminate('deaduuid', 'none', 'true', _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should postpone', function create (done) {
    rNock.put('/v2/subscriptions/deaduuid/postpone?next_renewal_date=2017-12-31Z&bulk=false').reply(200, data.dummy.xml);

    client.subscriptions.postpone('deaduuid', '2017-12-31Z', 'false', _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });
});