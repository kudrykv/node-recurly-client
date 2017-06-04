var _ = require('lodash');
var assert = require('assert');
var nock = require('nock');

var Recurly = require('../../index');
var keys = require('./keys');
var client = new Recurly(keys);
var data = require('./plans.data');
var json2xml = require('../../lib/utils/json2xml');
var rNock = nock('https://' + keys.subdomain + '.recurly.com').defaultReplyHeaders({
  'Content-Type': 'application/xml'
});

var validateGenericSuccessfulResponse = require('./utils/validateGenericSuccessfulResponse');

describe('Plans', function () {
  beforeEach(function () {
    nock.cleanAll();
  });

  afterEach(function () {
    assert(rNock.isDone(), 'Nock has not been called.');
  });

  it('should list', function list (done) {
    rNock.get('/v2/plans').reply(200, data.dummy.xml);

    client.plans.list(_.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should create', function create (done) {
    var requestBody = json2xml('plan', data.dummy.json.dummy);
    rNock.post('/v2/plans', requestBody).reply(200, data.dummy.xml);

    client.plans.create(data.dummy.json.dummy, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should lookup', function list (done) {
    rNock.get('/v2/plans/deadbeef').reply(200, data.dummy.xml);

    client.plans.lookup('deadbeef', _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should update', function create (done) {
    var requestBody = json2xml('plan', data.dummy.json.dummy);
    rNock.put('/v2/plans/deadbeef', requestBody).reply(200, data.dummy.xml);

    client.plans.update('deadbeef', data.dummy.json.dummy, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should delete', function del (done) {
    rNock.delete('/v2/plans/deadbeef').reply(204);

    client.plans.delete('deadbeef', function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      done();
    });
  });
});