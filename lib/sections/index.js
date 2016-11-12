var accounts = require('./accounts');
var accountAcquisition = require('./accountAcquisition');

module.exports = function (host, requester, requestCallbackHandler) {
  return {
    accounts: accounts(host, requester, requestCallbackHandler),
    accountAcquisition: accountAcquisition(host, requester, requestCallbackHandler)
  };
};