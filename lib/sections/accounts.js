var _ = require('lodash');
var xml2js = require('xml2js');

module.exports = function (host, requester, requestCallbackHandler) {
  return {
    lookup: function (accountCode, done) {
      requester({
        method: 'GET',
        uri: host + '/v2/accounts/' + accountCode
      }, _.partialRight(requestCallbackHandler, done));
    },

    list: function (options, done) {
      if (typeof options === 'function') { done = options; }

      requester({
        method: 'GET',
        uri: host + '/v2/accounts'
      }, _.partialRight(requestCallbackHandler, done));
    },

    create: function (details, done) {
      var builder = new xml2js.Builder();

      requester({
        method: 'POST',
        uri: host + '/v2/accounts',
        body: builder.buildObject({account: details})
      }, _.partialRight(requestCallbackHandler, done));
    },

    close: function (accountCode, done) {
      requester({
        method: 'DELETE',
        uri: host + '/v2/accounts/' + accountCode
      }, _.partialRight(requestCallbackHandler, done));
    },

    reopen: function (accountCode, done) {
      requester({
        method: 'PUT',
        uri: host + '/v2/accounts/' + accountCode + '/reopen'
      }, _.partialRight(requestCallbackHandler, done));
    },

    balance: function (accountCode, done) {
      requester({
        method: 'GET',
        uri: host + '/v2/accounts/' + accountCode + '/balance'
      }, _.partialRight(requestCallbackHandler, done));
    },

    notes: function (accountCode, done) {
      requester({
        method: 'GET',
        uri: host + '/v2/accounts/' + accountCode + '/notes'
      }, _.partialRight(requestCallbackHandler, done));
    }
  }
};