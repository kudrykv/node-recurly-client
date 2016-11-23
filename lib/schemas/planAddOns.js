module.exports = {
  list: {
    request: {
      method: 'GET',
      uri: '/v2/plans/:plan_code/add_ons'
    }
  },

  create: {
    request: {
      method: 'POST',
      uri: '/v2/plans/:plan_code/add_ons'
    },
    xml: {root: 'add_on'}
  },

  lookup: {
    request: {
      method: 'GET',
      uri: '/v2/plans/:plan_code/add_ons/:add_on_code'
    }
  },

  update: {
    request: {
      method: 'PUT',
      uri: '/v2/plans/:plan_code/add_ons/:add_on_code'
    },
    xml: {root: 'add_on'}
  },

  delete: {
    request: {
      method: 'DELETE',
      uri: '/v2/plans/:plan_code/add_ons/:add_on_code'
    }
  }
};
