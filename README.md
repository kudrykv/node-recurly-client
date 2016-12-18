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