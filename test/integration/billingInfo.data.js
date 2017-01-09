var fs = require('fs');

module.exports = {
  billingInfo: {
    xml: fs.readFileSync(__dirname + '/fixtures/billingInfo/billingInfo.datum.xml'),
    json: require('./fixtures/billingInfo/billingInfo.datum.json')
  }
};
