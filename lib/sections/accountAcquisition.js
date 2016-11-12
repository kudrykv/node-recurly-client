var _ = require('lodash');
var genericRequestCall = require('../utils/genericRequestCall');

var definitions = {
  create: {
    request: {
      method: 'POST',
      uri: '/v2/accounts/:accountCode/acquisition'
    },
    xml: {root: 'account_acquisition'}
  },

  lookup: {
    request: {
      method: 'GET',
      uri: '/v2/accounts/:accountCode/acquisition'
    }
  },

  update: {
    request: {
      method: 'PUT',
      uri: '/v2/accounts/:accountCode/acquisition'
    },
    xml: {root: 'account_acquisition'}
  },

  clear: {
    request: {
      method: 'DELETE',
      uri: '/v2/accounts/:accountCode/acquisition'
    }
  }
};

module.exports = function (request, handler, host) {
  var accounts = {};

  _.forEach(definitions, function (blueprint, method) {
    Object.defineProperty(accounts, method, {
      value: _.partial(genericRequestCall, request, handler, host, blueprint)
    })
  });

  return accounts;
};

