var _ = require('lodash');
var assert = require('assert');
var nock = require('nock');

var Recurly = require('../../index');
var keys = require('./keys');
var client = new Recurly(keys);
var data = require('./measuredUnits.data');
var json2xml = require('../../lib/utils/json2xml');
var rNock = nock('https://' + keys.subdomain + '.recurly.com').defaultReplyHeaders({
  'Content-Type': 'application/xml'
});

var validateGenericSuccessfulResponse = require('./utils/validateGenericSuccessfulResponse');

describe('Invoices', function () {
  beforeEach(function () {
    nock.cleanAll();
  });

  afterEach(function () {
    assert(rNock.isDone(), 'Nock has not been called.');
  });

  it('should list measured units', function list (done) {
    rNock.get('/v2/measured_units').reply(200, data.dummy.xml);

    client.measuredUnits.list(_.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should create', function create (done) {
    var requestBody = json2xml('measured_unit', data.dummy.json.dummy);
    rNock.post('/v2/measured_units', requestBody).reply(200, data.dummy.xml);

    client.measuredUnits.create(data.dummy.json.dummy, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should lookup measured units', function lookup (done) {
    rNock.get('/v2/measured_units/deadbeef').reply(200, data.dummy.xml);

    client.measuredUnits.lookup('deadbeef', _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should update', function update (done) {
    var requestBody = json2xml('measured_unit', data.dummy.json.dummy);
    rNock.put('/v2/measured_units/deadbeef', requestBody).reply(200, data.dummy.xml);

    client.measuredUnits.update('deadbeef', data.dummy.json.dummy, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should delete', function del (done) {
    rNock.delete('/v2/measured_units/deadbeef').reply(204, data.dummy.xml);

    client.measuredUnits.delete('deadbeef', function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      done();
    });
  });
});