var fs = require('fs');

module.exports = {
  coupons: {
    xml: fs.readFileSync(__dirname + '/fixtures/coupons/list.datum.xml')
  },

  coupon: {
    xml: fs.readFileSync(__dirname + '/fixtures/coupons/single.datum.xml')
  }
};
