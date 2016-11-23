module.exports = {
  list: {
    request: {
      method: 'GET',
      uri: '/v2/invoices'
    }
  },

  listAccount: {
    request: {
      method: 'GET',
      uri: '/v2/accounts/:account_code/invoices'
    }
  },

  preview: {
    request: {
      method: 'POST',
      uri: '/v2/accounts/:account_code/invoices/preview'
    },
    xml: {root: 'invoice'}
  },

  post: {
    request: {
      method: 'POST',
      uri: '/v2/accounts/:account_code/invoices'
    },
    xml: {root: 'invoice'}
  },

  lookup: {
    request: {
      method: 'GET',
      uri: '/v2/invoices/:invoice_number'
    }
  },

  retrieve: {
    request: {
      method: 'GET',
      uri: '/v2/invoices/:invoice_number',
      headers: {
        Accept: 'application/pdf'
      }
    }
  },

  markAsPaid: {
    request: {
      method: 'PUT',
      uri: '/v2/invoices/:invoice_number/mark_successful'
    }
  },

  markAsFailed: {
    request: {
      method: 'PUT',
      uri: '/v2/invoices/:invoice_number/mark_failed'
    }
  },

  refundLineItem: {
    request: {
      method: 'POST',
      uri: '/v2/invoices/:invoice_number/refund'
    },
    xml: {root: 'invoice'}
  },

  refundOpenAmount: {
    request: {
      method: 'POST',
      uri: '/v2/invoices/:invoice_number/refund'
    },
    xml: {root: 'invoice'}
  },

  offlinePayment: {
    request: {
      method: 'POST',
      uri: '/v2/invoices/:invoice_number/transactions'
    },
    xml: {root: 'transaction'}
  }
};
