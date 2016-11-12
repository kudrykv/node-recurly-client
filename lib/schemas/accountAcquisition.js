module.exports = {
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
