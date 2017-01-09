var fs = require('fs');

module.exports = {
  adjustments: {
    xml: fs.readFileSync(__dirname + '/fixtures/adjustments/adjustments.datum.xml'),
    json: {
      "adjustments": {
        "adjustment": {
          "account": "",
          "invoice": "",
          "subscription": "",
          "uuid": "37bff9dd3ec90471cf62bd4f6f80db3d",
          "state": "invoiced",
          "description": "Refund for Setup fee: Gold plan",
          "accounting_code": "",
          "product_code": "gold",
          "origin": "setup_fee",
          "unit_amount_in_cents": 800,
          "quantity": -1,
          "quantity_remaining": 0,
          "original_adjustment_uuid": "37bfef7af3cd23ee89d77a435aa1838d",
          "discount_in_cents": 0,
          "tax_in_cents": -70,
          "total_in_cents": -870,
          "currency": "EUR",
          "taxable": false,
          "tax_type": "usst",
          "tax_region": "CA",
          "tax_rate": 0.0875,
          "tax_exempt": false,
          "tax_code": "",
          "tax_details": {
            "tax_detail": [{"name": "", "type": "state", "tax_rate": 0.065, "tax_in_cents": -52}, {
              "name": "",
              "type": "county",
              "tax_rate": 0.01,
              "tax_in_cents": -8
            }, {"name": "", "type": "city", "tax_rate": 0, "tax_in_cents": 0}, {
              "name": "",
              "type": "special",
              "tax_rate": 0.0125,
              "tax_in_cents": -10
            }]
          },
          "start_date": 1470240144000,
          "end_date": "",
          "created_at": 1470240824000,
          "updated_at": 1470240824000,
          "revenue_schedule_type": "evenly"
        }
      }, "headers": {"content-type": "application/xml"}
    }
  },

  charge: {
    xml: fs.readFileSync(__dirname + '/fixtures/adjustments/charge.datum.xml'),
    json: {
      "adjustment": {
        "account": "",
        "uuid": "37c0031340577f993ff30b41738f52ff",
        "state": "pending",
        "description": "",
        "accounting_code": "",
        "product_code": "",
        "origin": "debit",
        "unit_amount_in_cents": 300,
        "quantity": 1,
        "discount_in_cents": 0,
        "tax_in_cents": 0,
        "total_in_cents": 5000,
        "currency": "USD",
        "taxable": false,
        "tax_exempt": false,
        "tax_code": "",
        "start_date": 1470241428000,
        "end_date": "",
        "created_at": 1470241428000,
        "updated_at": 1470241428000,
        "revenue_schedule_type": "at_invoice"
      }, "headers": {"content-type": "application/xml"}
    }
  }
};