module.exports = {
  list: {
    request: {
      method: 'GET',
      uri: '/v2/coupons'
    }
  },

  create: {
    request: {
      method: 'POST',
      uri: '/v2/coupons'
    },
    xml: {root: 'coupon'}
  },

  lookup: {
    request: {
      method: 'GET',
      uri: '/v2/coupons/:couponCode'
    }
  },

  generate: {
    request: {
      method: 'POST',
      uri: '/v2/coupons/:couponCode/generate'
    },
    xml: {root: 'coupon'}
  },

  expire: {
    request: {
      method: 'DELETE',
      uri: '/v2/coupons/:couponCode'
    }
  },

  edit: {
    request: {
      method: 'PUT',
      uri: '/v2/coupons/:couponCode'
    },
    xml: {root: 'coupon'}
  },

  restore: {
    request: {
      method: 'PUT',
      uri: '/v2/coupons/:couponCode/restore'
    },
    xml: {root: 'coupon'}
  },

  listUnique: {
    request: {
      method: 'GET',
      uri: '/v2/coupons/:couponCode/unique_coupon_codes'
    }
  }
};
