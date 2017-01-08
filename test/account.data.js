var fs = require('fs');

module.exports = {
  requests: {
    create: {
      account_code: 'deadbeef',
      email: 'dead@beef'
    }
  },

  badData: {
    xml: fs.readFileSync(__dirname + '/fixtures/accounts/badData.datum.xml'),
    json: {"errors": {"error": ["can't be blank", "is invalid"]}}
  },

  account: {
    xml: fs.readFileSync(__dirname + '/fixtures/accounts/account.datum.xml'),
    json: {
      "account": {
        "adjustments": "",
        "account_balance": "",
        "invoices": "",
        "shipping_addresses": "",
        "subscriptions": "",
        "transactions": "",
        "account_code": "deadbeef1483819734930",
        "state": "active",
        "username": "",
        "email": "deadbeef1483819734930@dummy.com",
        "cc_emails": "",
        "first_name": "",
        "last_name": "",
        "company_name": "",
        "vat_number": "",
        "address": {"address1": "", "address2": "", "city": "", "state": "", "zip": "", "country": "", "phone": ""},
        "accept_language": "",
        "hosted_login_token": "48dfc02eb4af7fba8480c9495f249855",
        "created_at": 1483820472000,
        "updated_at": 1483820472000,
        "closed_at": ""
      }
    }
  },

  accounts: {
    xml: fs.readFileSync(__dirname + '/fixtures/accounts/accounts.datum.xml')
  },

  unknown: {
    xml: fs.readFileSync(__dirname + '/fixtures/accounts/unknown.datum.xml'),
    json: {
      "error": {
        "symbol": "not_found",
        "description": "Couldn't find Account with account_code = unknown"
      }
    }
  },

  balance: {
    xml: fs.readFileSync(__dirname + '/fixtures/accounts/balance.datum.xml')
  },

  notes: {
    xml: fs.readFileSync(__dirname + '/fixtures/accounts/notes.datum.xml')
  }
};