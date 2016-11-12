var genericClientComposer = require('./utils/genericClientComposer');

var accountsSchema = require('./schemas/accounts');
var accountAcquisitionSchema = require('./schemas/accountAcquisition');

module.exports = function (requester, requestCallbackHandler, host) {
  return {
    accounts: genericClientComposer(accountsSchema, requester, requestCallbackHandler, host),
    accountAcquisition: genericClientComposer(accountAcquisitionSchema, requester, requestCallbackHandler, host)
  };
};