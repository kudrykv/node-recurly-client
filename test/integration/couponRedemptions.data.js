var fs = require('fs');

module.exports = {
  list: {
    xml: fs.readFileSync(__dirname + '/fixtures/couponRedemptions/list.datum.xml'),
    json: require('./fixtures/couponRedemptions/list.datum.json')
  },

  single: {
    xml: fs.readFileSync(__dirname + '/fixtures/couponRedemptions/single.datum.xml'),
    json: require('./fixtures/couponRedemptions/single.datum.json')
  }
};
