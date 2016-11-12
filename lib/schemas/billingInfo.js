module.exports = {
  create: {
    request: {
      method: 'POST',
      uri: '/v2/accounts/:accountCode/billing_info'
    },
    xml: {root: 'billing_info'}
  },

  lookup: {
    request: {
      method: 'GET',
      uri: '/v2/accounts/:accountCode/billing_info'
    }
  },

  update: {
    request: {
      method: 'PUT',
      uri: '/v2/accounts/:accountCode/billing_info'
    },
    xml: {root: 'billing_info'}
  },

  clear: {
    request: {
      method: 'DELETE',
      uri: '/v2/accounts/:accountCode/billing_info'
    }
  }};
