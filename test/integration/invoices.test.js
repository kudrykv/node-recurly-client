var _ = require('lodash');
var assert = require('assert');
var nock = require('nock');

var Recurly = require('../../index');
var keys = require('./keys');
var client = new Recurly(keys);
var data = require('./invoices.data');
var json2xml = require('../../lib/utils/json2xml');
var rNock = nock('https://' + keys.subdomain + '.recurly.com').defaultReplyHeaders({
  'Content-Type': 'application/xml'
});

var validateGenericSuccessfulResponse = require('./utils/validateGenericSuccessfulResponse');
var validateGenericFailureResponse = require('./utils/validateGenericFailureResponse');

describe('Invoices', function () {
  beforeEach(function () {
    nock.cleanAll();
  });

  afterEach(function () {
    assert(rNock.isDone(), 'Nock has not been called.');
  });

  it('should get the list of invoices', function list (done) {
    rNock.get('/v2/invoices').reply(200, data.dummy.xml);

    client.invoices.list(_.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should list invoices by account', function list (done) {
    rNock.get('/v2/accounts/deadbeef/invoices').reply(200, data.dummy.xml);

    client.invoices.listAccount('deadbeef', _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should preview the invoice', function preview (done) {
    var requestBody = json2xml('invoice', data.dummy.json.dummy);
    rNock.post('/v2/accounts/deadbeef/invoices/preview', requestBody).reply(200, data.dummy.xml);

    client.invoices.preview('deadbeef', data.dummy.json.dummy, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should post the invoice', function preview (done) {
    var requestBody = json2xml('invoice', data.dummy.json.dummy);
    rNock.post('/v2/accounts/deadbeef/invoices', requestBody).reply(200, data.dummy.xml);

    client.invoices.post('deadbeef', data.dummy.json.dummy, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should lookup invoice by stringified number', function lookup (done) {
    rNock.get('/v2/invoices/4815162342').reply(200, data.dummy.xml);

    client.invoices.lookup('4815162342', _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should lookup invoice by number', function lookup (done) {
    rNock.get('/v2/invoices/4815162342').reply(200, data.dummy.xml);

    client.invoices.lookup(4815162342, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should mark invoice as paid using stringified number', function markAsPaid (done) {
    rNock.put('/v2/invoices/4815162342/mark_successful').reply(200, data.dummy.xml);

    client.invoices.markAsPaid('4815162342', _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should mark invoice as paid using number', function markAsPaid (done) {
    rNock.put('/v2/invoices/4815162342/mark_successful').reply(200, data.dummy.xml);

    client.invoices.markAsPaid(4815162342, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should mark as failed', function markAsFailed (done) {
    rNock.put('/v2/invoices/4815162342/mark_failed').reply(200, data.dummy.xml);

    client.invoices.markAsFailed(4815162342, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should refund line item', function refundLineItem (done) {
    var requestBody = json2xml('invoice', data.dummy.json.dummy);
    rNock.post('/v2/invoices/4815162342/refund', requestBody).reply(200, data.dummy.xml);

    client.invoices.refundLineItem(4815162342, data.dummy.json.dummy, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should refund open amount', function refundLineItem (done) {
    var requestBody = json2xml('invoice', data.dummy.json.dummy);
    rNock.post('/v2/invoices/4815162342/refund', requestBody).reply(200, data.dummy.xml);

    client.invoices.refundOpenAmount(4815162342, data.dummy.json.dummy, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });

  it('should make open transaction', function open (done) {
    var requestBody = json2xml('transaction', data.dummy.json.dummy);
    rNock.post('/v2/invoices/4815162342/transactions', requestBody).reply(200, data.dummy.xml);

    client.invoices.offlinePayment(4815162342, data.dummy.json.dummy, _.partialRight(validateGenericSuccessfulResponse, data.dummy.json, done));
  });
});