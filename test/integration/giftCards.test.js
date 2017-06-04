var _ = require('lodash');
var assert = require('assert');
var nock = require('nock');

var Recurly = require('../../index');
var keys = require('./keys');
var client = new Recurly(keys);
var data = require('./giftCards.data');
var json2xml = require('../../lib/utils/json2xml');
var rNock = nock('https://' + keys.subdomain + '.recurly.com').defaultReplyHeaders({
  'Content-Type': 'application/xml'
});

var validateGenericSuccessfulResponse = require('./utils/validateGenericSuccessfulResponse');
var validateGenericFailureResponse = require('./utils/validateGenericFailureResponse');

describe('Gift Cards', function () {
  beforeEach(function () {
    nock.cleanAll();
  });

  afterEach(function () {
    assert(rNock.isDone(), 'Nock has not been called.');
  });

  it('should get a list of gift cards', function list (done) {
    rNock.get('/v2/gift_cards').reply(200, data.list.xml);

    client.giftCards.list(_.partialRight(validateGenericSuccessfulResponse, data.list.json, done));
  });

  it('should get a preview', function preview (done) {
    var requestBody = json2xml('gift_card', data.card.json.gift_card);
    rNock.post('/v2/gift_cards/preview', requestBody).reply(200, data.card.xml);

    client.giftCards.preview(data.card.json.gift_card, _.partialRight(validateGenericSuccessfulResponse, data.card.json, done));
  });
  
  it('should create gift card', function create (done) {
    var requestBody = json2xml('gift_card', data.card.json.gift_card);
    rNock.post('/v2/gift_cards', requestBody).reply(200, data.card.xml);

    client.giftCards.create(data.card.json.gift_card, _.partialRight(validateGenericSuccessfulResponse, data.card.json, done));
  });

  it('should lookup gift card by id', function lookup (done) {
    var id = data.card.json.gift_card.id;
    rNock.get('/v2/gift_cards/' + id).reply(200, data.card.xml);

    client.giftCards.lookup(id, _.partialRight(validateGenericSuccessfulResponse, data.card.json, done));
  });

  it('should redeem the gift card', function redeem (done) {
    var id = data.card.json.gift_card.id;
    var body = {account_code: 'deadbeef'};
    rNock.post('/v2/gift_cards/' + id + '/redeem', json2xml('recipient_account', body)).reply(200, data.card.xml);

    client.giftCards.redeem(id, body, _.partialRight(validateGenericSuccessfulResponse, data.card.json, done));
  });
});