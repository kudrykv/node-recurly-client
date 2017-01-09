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
    json: require('./fixtures/accounts/badData.datum.json')
  },

  account: {
    xml: fs.readFileSync(__dirname + '/fixtures/accounts/account.datum.xml'),
    json: require('./fixtures/accounts/account.datum.json')
  },

  accounts: {
    xml: fs.readFileSync(__dirname + '/fixtures/accounts/accounts.datum.xml'),
    json: require('./fixtures/accounts/accounts.datum.json')
  },

  unknown: {
    xml: fs.readFileSync(__dirname + '/fixtures/accounts/unknown.datum.xml'),
    json: require('./fixtures/accounts/unknown.datum.json')
  },

  balance: {
    xml: fs.readFileSync(__dirname + '/fixtures/accounts/balance.datum.xml'),
    json: require('./fixtures/accounts/balance.datum.json')
  },

  notes: {
    xml: fs.readFileSync(__dirname + '/fixtures/accounts/notes.datum.xml'),
    json: require('./fixtures/accounts/notes.datum.json')
  }
};