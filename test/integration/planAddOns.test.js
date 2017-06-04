var _ = require('lodash');
var assert = require('assert');
var nock = require('nock');

var Recurly = require('../../index');
var keys = require('./keys');
var client = new Recurly(keys);
var data = require('./planAddOns.data');
var json2xml = require('../../lib/utils/json2xml');
var rNock = nock('https://' + keys.subdomain + '.recurly.com').defaultReplyHeaders({
  'Content-Type': 'application/xml'
});

var validateGenericSuccessfulResponse = require('./utils/validateGenericSuccessfulResponse');

describe('Plan add-ons', function () {
  beforeEach(function () {
    nock.cleanAll();
  });

  afterEach(function () {
    assert(rNock.isDone(), 'Nock has not been called.');
  });

  it('should list', function list (done) {
    rNock.get('/v2/plans/deadbeef/add_ons').reply(200, data.dummy.xml);

    client.planAddOns.list('deadbeef', _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should create', function create (done) {
    var requestBody = json2xml('add_on', data.dummy.json.dummy);
    rNock.post('/v2/plans/deadbeef/add_ons', requestBody).reply(200, data.dummy.xml);

    client.planAddOns.create('deadbeef', data.dummy.json.dummy, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should lookup', function lookup (done) {
    rNock.get('/v2/plans/deadbeef/add_ons/isdead').reply(200, data.dummy.xml);

    client.planAddOns.lookup('deadbeef', 'isdead', _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should update', function create (done) {
    var requestBody = json2xml('add_on', data.dummy.json.dummy);
    rNock.put('/v2/plans/deadbeef/add_ons/isdead', requestBody).reply(200, data.dummy.xml);

    client.planAddOns.update('deadbeef', 'isdead', data.dummy.json.dummy, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should delete', function del (done) {
    rNock.delete('/v2/plans/deadbeef/add_ons/isdead').reply(204, data.dummy.xml);

    client.planAddOns.delete('deadbeef', 'isdead', function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      done();
    });
  });
});