var fs = require('fs');

module.exports = {
  unknown: {
    xml: fs.readFileSync(__dirname + '/fixtures/accountAcquisition/badrequest.datum.xml'),
    json: require('./fixtures/accountAcquisition/badrequest.datum.json')
  },

  acquisition: {
    xml: fs.readFileSync(__dirname + '/fixtures/accountAcquisition/accountAcquisition.datum.xml'),
    json: require('./fixtures/accountAcquisition/accountAcquisition.datum.json')
  }
};
