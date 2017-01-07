# The Recurly Client

There was a library already. But I didn't quite like it. So I created my own library, with blackjack and generics.

The code covers most methods described in the [Recurly Developer Hub](https://dev.recurly.com).

# Why?
You can configure `xml2js` parser, that lives under the hood. Like this:
```
new Recurly({
  /* API key, subdomain */
}, {
  /* xml2js conf! */
})
```

The library doesn't check weird callback length whatsoever (as neighboring does). Who need those things?

# Usage
## Installation
```sh
npm install --save node-recurly-client
```

## Usage
```js
var Recurly = require('node-recurly-client');
var recurly = new Recurly({
  apiKey: 'api-key-goes-here',
  subdomain: 'subdomain-goes-there'
});

recurly.accounts.create({
  account_code: '0xdeadbeef',
  email: 'deadbeef.is@watching.you'
}, function (err, response) {/* processing etc. */});
```

# How does this thing work?

You may notice, that library doesn't have any methods explicitly defined, that call Recurly resource. Isn't it lovely?

Roughly saying, the library does the following:

1. Get the request library.
2. Set the default headers.
3. Magically create methods by provided JSON files.

The JSON files live in the library under `lib/schemas` path. Usually, you don't need to worry about them.

All request parameters subordinate to the following logic:

1. URI parameters go as separate parameters.
2. Body object if any goes after all URI parameters.
3. The callback is obligatory and is the last parameter.

Let's take as an example [update subscription](https://dev.recurly.com/docs/update-subscription) call. It wants one
parameter in URI and a body. The call would look like this:

```js
recurly.subscription.update('uuid-string', {/* body */}, callback);
```

How would another random call would look like, if there would be multiple URI parameters? Easy!

```js
recurly.random.call(uriParamString1, uriParamString2, bodyObj, callback);
```

If there are no modifiers in URI, those parameters have to be omitted.
If there is no body, body parameter has to be omitted.

# Methods
## [Accounts](https://dev.recurly.com/docs/account-object)
```js
recurly.accounts.list(cb);
recurly.accounts.create(body, cb);
recurly.accounts.lookup(accountCode, body, cb);
recurly.accounts.update(accountCode, body, cb);
recurly.accounts.close(accountCode, cb);
recurly.accounts.reopen(accountCode, body, cb);
recurly.accounts.balance(accountCode, cb);
recurly.accounts.notes(accountCode, cb);
```

## [Account Acquisition](https://dev.recurly.com/docs/create-account-acquisition)
```js
recurly.accountAcquisition.create(accountCode, body, cb);
recurly.accountAcquisition.lookup(accountCode, cb);
recurly.accountAcquisition.update(accountCode, body, cb);
recurly.accountAcquisition.clear(accountCode, cb);
```

## [Adjustments](https://dev.recurly.com/docs/adjustment-object)
```js
recurly.adjustments.list(accountCode, cb);
recurly.adjustments.create(accountCode, body, cb);
recurly.adjustments.lookup(uuid, cb);
recurly.adjustments.delete(uuid, cb);
```

## [Billing info](https://dev.recurly.com/docs/create-an-accounts-billing-info-token)
```js
recurly.billingInfo.create(accountCode, body, cb);
recurly.billingInfo.lookup(accountCode, cb);
recurly.billingInfo.update(accountCode, body, cb);
recurly.billingInfo.clear(accountCode, cb);
```

## [Coupons](https://dev.recurly.com/docs/list-active-coupons)
```js
recurly.coupons.list(cb);
recurly.coupons.create(body, cb);
recurly.coupons.lookup(couponCode, cb);
recurly.coupons.generate(couponCode, body, cb);
recurly.coupons.expire(couponCode, cb);
recurly.coupons.edit(couponCode, body, cb);
recurly.coupons.restore(couponCode, body, cb);
recurly.coupons.listUnique(couponCode, cb);
```

## [Coupon redemptions](https://dev.recurly.com/docs/lookup-a-coupon-redemption-on-an-account)
```js
recurly.couponRedemptions.account(accountCode, cb);
recurly.couponRedemptions.coupon(accountCode, redemptionUuid, cb);
recurly.couponRedemptions.invoice(invoiceNumber, cb);
recurly.couponRedemptions.subscription(uuid, cb);
recurly.couponRedemptions.redeem(couponCode, cb);
recurly.couponRedemptions.remove(accountCode, uuid, cb);
```

## [Gift cards](https://dev.recurly.com/docs/gift-card-object)
```js
recurly.giftCards.list(cb);
recurly.giftCards.preview(body, cb);
recurly.giftCards.create(body, cb);
recurly.giftCards.lookup(id, cb);
recurly.giftCards.redeem(redemptionCode, body, cb);
recurly.giftCards.previewSubscription(body, cb);
recurly.giftCards.createSubscription(body, cb);
```

## [Invoices](https://dev.recurly.com/docs/list-invoices)
```js
recurly.invoices.list(cb);
recurly.invoices.listAccount(accountCode, cb);
recurly.invoices.preview(accountCode, body, cb);
recurly.invoices.post(accountCode, body, cb);
recurly.invoices.lookup(invoiceNumber, cb);
recurly.invoices.markAsPaid(invoiceNumber, cb);
recurly.invoices.markAsFailed(invoiceNumber, cb);
recurly.invoices.refundLineItem(invoiceNumber, body, cb);
recurly.invoices.refundOpenAmount(invoiceNumber, body, cb);
recurly.invoices.offlinePayment(invoiceNumber, body, cb);
```

## [Plans](https://dev.recurly.com/docs/list-plans)
```js
recurly.plans.list(cb);
recurly.plans.create(body, cb);
recurly.plans.lookup(planCode, cb);
recurly.plans.update(planCode, cb);
recurly.plans.delete(planCode, cb);
```

## [Plan add-ons](https://dev.recurly.com/docs/plan-add-ons-object)
```js
recurly.planAddOns.list(planCode, cb);
recurly.planAddOns.create(planCode, body, cb);
recurly.planAddOns.lookup(planCode, addOnCode, cb);
recurly.planAddOns.update(planCode, addOnCode, body, cb);
recurly.planAddOns.delete(planCode, addOnCode, cb);
```

## [Measured units](https://dev.recurly.com/docs/measured-unit-object)
```js
recurly.measuredUnits.list(cb);
recurly.measuredUnits.create(body, cb);
recurly.measuredUnits.lookup(measuredUnitId, cb);
recurly.measuredUnits.update(measuredUnitId, body, cb);
recurly.measuredUnits.delete(measuredUnitId, cb);
```
