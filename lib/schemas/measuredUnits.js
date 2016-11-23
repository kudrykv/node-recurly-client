module.exports = {
  list: {
    request: {
      method: 'GET',
      uri: '/v2/measured_units'
    }
  },

  create: {
    request: {
      method: 'POST',
      uri: '/v2/measured_units'
    },
    xml: {root: 'measured_unit'}
  },

  lookup: {
    request: {
      method: 'GET',
      uri: '/v2/measured_units/:measured_unit_id'
    }
  },

  update: {
    request: {
      method: 'PUT',
      uri: '/v2/measured_units/:measured_unit_id'
    },
    xml: {root: 'measured_unit'}
  },

  delete: {
    request: {
      method: 'DELETE',
      uri: '/v2/measured_units/:measured_units_id'
    }
  }
};
