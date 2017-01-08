var fs = require('fs');

module.exports = {
  unknown: {
    xml: fs.readFileSync(__dirname + '/fixtures/accountAcquisition/badrequest.datum.xml')
  },

  acquisition: {
    xml: fs.readFileSync(__dirname + '/fixtures/accountAcquisition/accountAcquisition.datum.xml')
  }
};
