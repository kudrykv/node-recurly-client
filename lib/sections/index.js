var accounts = require('./accounts');

module.exports = function (host, requester, requestCallbackHandler) {
  return {
    accounts: accounts(host, requester, requestCallbackHandler)
  };
};