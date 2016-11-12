module.exports = {
  list: {
    request: {
      method: 'GET',
      uri: '/v2/accounts/:accountCode/adjustments'
    }
  },

  create: {
    request: {
      method: 'POST',
      uri: '/v2/accounts/:accountCode/adjustments'
    },
    xml: {root: 'adjustment'}
  },

  lookup: {
    request: {
      method: 'GET',
      uri: '/v2/adjustments/:uuid'
    }
  },

  delete: {
    request: {
      method: 'DELETE',
      uri: '/v2/adjustments/:uuid'
    }
  }
};
