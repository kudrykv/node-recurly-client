module.exports = {
  list: {
    request: {
      method: 'GET',
      uri: '/v2/accounts'
    }
  },

  create: {
    request: {
      method: 'POST',
      uri: '/v2/accounts'
    },
    xml: {root: 'account'}
  },

  lookup: {
    request: {
      method: 'GET',
      uri: '/v2/accounts/:accountCode'
    },
    xml: {root: 'account'}
  },

  update: {
    request: {
      method: 'PUT',
      uri: '/v2/accounts/:accountCode'
    },
    xml: {root: 'account'}
  },

  close: {
    request: {
      method: 'DELETE',
      uri: '/v2/accounts/:accountCode'
    }
  },

  reopen: {
    request: {
      method: 'PUT',
      uri: '/v2/accounts/:accountCode/reopen'
    },
    xml: {root: 'account'}
  },

  balance: {
    request: {
      method: 'GET',
      uri: '/v2/accounts/:accountCode/balance'
    }
  },

  notes: {
    request: {
      method: 'GET',
      uri: '/v2/accounts/:accountCode/notes'
    }
  }
};
