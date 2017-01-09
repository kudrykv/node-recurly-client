require('should');

var genericRequestCall = require('../../../../lib/utils/genericRequestCall');

function empty () {}
var host = 'host';

var getBlueprint = {
  request: {
    uri: '/uri/:placeholder/:second',
    method: 'GET'
  }
};

var postBlueprint = {
  request: {
    uri: '/uri/:param1/randomstuff/:secondParam',
    method: 'POST'
  },
  xml: {root: 'rawr'}
};

describe('Generic request call', function () {
  it('should prepare request options for GET', function prepareGetty (done) {
    var qs = {oh: 'my'};
    genericRequestCall(requester, empty, host, getBlueprint, 'first', 'second', qs, empty);

    function requester (request, cb) {
      request.uri.should.be.eql('host/uri/first/second');
      request.qs.should.be.eql(qs);
      cb.should.be.a.Function();

      done();
    }
  });

  it('should prepare request options for POST', function preparePosty (done) {
    var body = {a: 'b', c: {d: 'e'}};
    var expected = {
      uri: 'host/uri/first/randomstuff/second',
      method: 'POST',
      body: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<rawr>\n  <a>b</a>\n  <c>\n    <d>e</d>\n  </c>\n</rawr>'
    };

    genericRequestCall(requester, empty, host, postBlueprint, 'first', 'second', body, empty);

    function requester (request, cb) {
      request.should.be.eql(expected);
      cb.should.be.a.Function();

      done();
    }
  });
});