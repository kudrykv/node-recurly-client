var genericClientComposer = require('./utils/genericClientComposer');

var accountsSchema = require('./schemas/accounts');
var accountAcquisitionSchema = require('./schemas/accountAcquisition');
var adjustmentsSchema = require('./schemas/adjustments');
var billingInfoSchema = require('./schemas/billingInfo');
var couponsSchema = require('./schemas/coupons');

module.exports = function (requester, requestCallbackHandler, host) {
  return {
    accounts: genericClientComposer(accountsSchema, requester, requestCallbackHandler, host),
    accountAcquisition: genericClientComposer(accountAcquisitionSchema, requester, requestCallbackHandler, host),
    adjustments: genericClientComposer(adjustmentsSchema, requester, requestCallbackHandler, host),
    billingInfo: genericClientComposer(billingInfoSchema, requester, requestCallbackHandler, host),
    coupons: genericClientComposer(couponsSchema, requester, requestCallbackHandler, host)
  };
};