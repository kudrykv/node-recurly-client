var _ = require('lodash');
var xml2js = require('xml2js');

module.exports = function (host, requester, requestCallbackHandler) {
  return {
    create: function (accountCode, json, done) {
      var xmlString = new xml2js.Builder().buildObject({account_acquisition: json});

      requester({
        method: 'POST',
        uri: host + '/v2/accounts/' + accountCode + '/acquisition',
        body: xmlString
      }, _.partialRight(requestCallbackHandler, done));
    },

    lookup: function (accountCode, done) {
      requester({
        method: 'GET',
        uri: host + '/v2/accounts/' + accountCode + '/acquisition'
      }, _.partialRight(requestCallbackHandler, done));
    },

    update: function (accountCode, json, done) {
      var xmlString = new xml2js.Builder().buildObject({account_acquisition: json});

      requester({
        method: 'PUT',
        uri: host + '/v2/accounts/' + accountCode + '/acquisition',
        body: xmlString
      }, _.partialRight(requestCallbackHandler, done));
    },

    clear: function (accountCode, json, done) {
      requester({
        method: 'DELETE',
        uri: host + '/v2/accounts/' + accountCode + '/acquisition'
      }, _.partialRight(requestCallbackHandler, done));
    }
  };
};
