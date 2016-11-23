module.exports = {
  list: {
    request: {
      method: 'GET',
      uri: '/v2/gift_cards'
    }
  },

  preview: {
    request: {
      method: 'POST',
      uri: '/gift_cards/preview'
    },
    xml: {root: 'gift_card'}
  },

  create: {
    request: {
      method: 'POST',
      uri: '/gift_cards'
    },
    xml: {root: 'gift_card'}
  },

  lookup: {
    request: {
      method: 'GET',
      uri: '/v2/gift_cards/:id'
    }
  },

  redeem: {
    request: {
      method: 'POST',
      uri: '/v2/gift_cards/:redemption_code/redeem'
    },
    xml: {root: 'recipient_account'}
  },

  previewSubscription: {
    request: {
      method: 'POST',
      uri: '/v2/subscriptions/preview'
    },
    xml: {root: 'subscription'}
  },

  createSubscription: {
    request: {
      method: 'POST',
      uri: '/v2/subscriptions'
    },
    xml: {root: 'subscription'}
  }
};
