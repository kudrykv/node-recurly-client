var fs = require('fs');

module.exports = {
  list: {
    xml: fs.readFileSync(__dirname + '/fixtures/giftCards/list.datum.xml'),
    json: require('./fixtures/giftCards/list.datum.json')
  },

  card: {
    xml: fs.readFileSync(__dirname + '/fixtures/giftCards/card.datum.xml'),
    json: require('./fixtures/giftCards/card.datum.json')
  }
};