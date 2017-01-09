var fs = require('fs');

module.exports = {
  adjustments: {
    xml: fs.readFileSync(__dirname + '/fixtures/adjustments/adjustments.datum.xml'),
    json: require('./fixtures/adjustments/adjustments.datum.json')
  },

  charge: {
    xml: fs.readFileSync(__dirname + '/fixtures/adjustments/charge.datum.xml'),
    json: require('./fixtures/adjustments/charge.datum.json')
  }
};