var fs = require('fs');

module.exports = {
  coupons: {
    xml: fs.readFileSync(__dirname + '/fixtures/coupons/list.datum.xml'),
    json: require('./fixtures/coupons/list.datum.json')
  },

  coupon: {
    xml: fs.readFileSync(__dirname + '/fixtures/coupons/single.datum.xml'),
    json: require('./fixtures/coupons/single.datum.json')
  }
};
