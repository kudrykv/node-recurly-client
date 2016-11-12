var accounts = require('./accounts');
var accountAcquisition = require('./accountAcquisition');

module.exports = function (host, requester, requestCallbackHandler) {
  return {
    accounts: accounts(requester, requestCallbackHandler, host),
    accountAcquisition: accountAcquisition(requester, requestCallbackHandler, host)
  };
};