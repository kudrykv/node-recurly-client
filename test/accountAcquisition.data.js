var fs = require('fs');

module.exports = {
  unknown: {
    xml: fs.readFileSync(__dirname + '/fixtures/accountAcquisition/badrequest.datum.xml'),
    json: {
      "error": {"symbol": "not_found", "description": "Couldn't find Account with account_code = unknown"},
      "headers": {"content-type": "application/xml"}
    }
  },

  acquisition: {
    xml: fs.readFileSync(__dirname + '/fixtures/accountAcquisition/accountAcquisition.datum.xml'),
    json: {
      "account_acquisition": {
        "account": "",
        "cost_in_cents": 199,
        "currency": "USD",
        "channel": "blog",
        "subchannel": "Whitepaper Blog Post",
        "campaign": "mailchimp67a904de95.0914d8f4b4",
        "created_at": 1471031114000,
        "updated_at": 1471031114000
      }, "headers": {"content-type": "application/xml"}
    }
  }
};
