var fs = require('fs');

module.exports = {
  dummy: {
    xml: fs.readFileSync(__dirname + '/fixtures/dummy/single.datum.xml'),
    json: require('./fixtures/dummy/single.datum.json')
  }
};