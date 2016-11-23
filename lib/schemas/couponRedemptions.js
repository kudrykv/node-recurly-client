module.exports = {
  account: {
    request: {
      method: 'GET',
      uri: '/v2/accounts/:account_code/redemptions'
    }
  },

  coupon: {
    request: {
      method: 'GET',
      uri: '/v2/accounts/:account_code/redemptions/:redemption_uuid'
    }
  },

  invoice: {
    request: {
      method: 'GET',
      uri: '/v2/invoices/:invoice_number/redemptions'
    }
  },

  subscription: {
    request: {
      method: 'GET',
      uri: '/v2/subscriptions/:uuid/redemptions'
    }
  },

  redeem: {
    request: {
      method: 'POST',
      uri: '/v2/coupons/:coupon_code/redeem'
    },
    xml: {root: 'redemption'}
  },

  remove: {
    request: {
      method: 'DELETE',
      uri: '/v2/accounts/:account_code/redemptions/:uuid'
    }
  }
};
