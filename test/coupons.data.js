var fs = require('fs');

module.exports = {
  coupons: {
    xml: fs.readFileSync(__dirname + '/fixtures/coupons/list.datum.xml'),
    json: {
      "coupons": {
        "coupon": {
          "redemptions": "",
          "coupon_code": "special",
          "name": "Special 10% off",
          "state": "redeemable",
          "description": "",
          "discount_type": "percent",
          "discount_percent": 10,
          "invoice_description": "",
          "redeem_by_date": 1514678400000,
          "single_use": true,
          "applies_for_months": "",
          "max_redemptions": 200,
          "applies_to_all_plans": false,
          "created_at": 1468263017000,
          "updated_at": 1468263017000,
          "deleted_at": "",
          "duration": "single_use",
          "temporal_unit": "",
          "temporal_amount": "",
          "applies_to_non_plan_charges": false,
          "redemption_resource": "account",
          "max_redemptions_per_account": "",
          "coupon_type": "single_code",
          "plan_codes": {"plan_code": ["gold", "platinum"]},
          "a": ""
        }
      }, "headers": {"content-type": "application/xml"}
    }
  },

  coupon: {
    xml: fs.readFileSync(__dirname + '/fixtures/coupons/single.datum.xml'),
    json: {
      "coupon": {
        "redemptions": "",
        "coupon_code": "deadbeef",
        "name": "Coupon for testing purposes",
        "state": "redeemable",
        "description": "",
        "discount_type": "percent",
        "discount_percent": 10,
        "invoice_description": "",
        "redeem_by_date": "",
        "single_use": true,
        "applies_for_months": "",
        "max_redemptions": 200,
        "applies_to_all_plans": false,
        "created_at": 1468263017000,
        "updated_at": 1468263017000,
        "deleted_at": "",
        "duration": "single_use",
        "temporal_unit": "",
        "temporal_amount": "",
        "applies_to_non_plan_charges": false,
        "redemption_resource": "account",
        "max_redemptions_per_account": "",
        "coupon_type": "single_code",
        "plan_codes": "",
        "a": ""
      }, "headers": {"content-type": "application/xml"}
    }
  }
};
