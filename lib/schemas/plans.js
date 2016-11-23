module.exports = {
  list: {
    request: {
      method: 'GET',
      uri: '/v2/plans'
    }
  },

  create: {
    request: {
      method: 'POST',
      uri: '/v2/plans'
    },
    xml: {root: 'plan'}
  },

  lookup: {
    request: {
      method: 'GET',
      uri: '/v2/plans/:plan_code'
    }
  },

  update: {
    request: {
      method: 'PUT',
      uri: '/v2/plans/:plan_code'
    },
    xml: {root: 'plan'}
  },

  delete: {
    request: {
      method: 'DELETE',
      uri: '/v2/plans/:plan_code'
    }
  }
};
