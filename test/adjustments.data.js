var fs = require('fs');

module.exports = {
  adjustments: {
    xml: fs.readFileSync(__dirname + '/fixtures/adjustments/adjustments.datum.xml')
  },

  charge: {
    xml: fs.readFileSync(__dirname + '/fixtures/adjustments/charge.datum.xml')
  }
};