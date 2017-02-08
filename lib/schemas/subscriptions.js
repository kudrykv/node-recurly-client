module.exports = {
  list: {
    request: {
      method: 'GET',
      uri: '/v2/accounts/:account_code/subscriptions'
    }
  },

  preview: {
    request: {
      method: 'POST',
      uri: '/v2/subscriptions/preview'
    },
    xml: {root: 'subscription'}
  },

  create: {
    request: {
      method: 'POST',
      uri: '/v2/subscriptions'
    },
    xml: {root: 'subscription'}
  },

  lookup: {
    request: {
      method: 'GET',
      uri: '/v2/subscriptions/:uuid'
    }
  },

  previewChange: {
    request: {
      method: 'POST',
      uri: '/v2/subscriptions/:uuid/preview'
    },
    xml: {root: 'subscription'}
  },

  update: {
    request: {
      method: 'PUT',
      uri: '/v2/subscriptions/:uuid'
    },
    xml: {root: 'subscription'}
  },

  updateNotes: {
    request: {
      method: 'PUT',
      uri: '/v2/subscriptions/:uuid/notes'
    },
    xml: {root: 'subscription'}
  },

  cancel: {
    request: {
      method: 'PUT',
      uri: '/v2/subscriptions/:uuid/cancel'
    }
  },

  reactivate: {
    request: {
      method: 'PUT',
      uri: '/v2/subscriptions/:uuid/reactivate'
    }
  },

  terminate: {
    request: {
      method: 'PUT',
      uri: '/v2/subscriptions/:uuid/terminate?refund=:refund_type&charge=:boolean'
    }
  },

  postpone: {
    request: {
      method: 'PUT',
      uri: '/v2/subscriptions/:uuid/postpone?next_renewal_date=:next_renewal_date&bulk=:bulk'
    }
  }
};
