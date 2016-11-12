var assert = require('assert');

module.exports = function validateGenericSuccessfulResponse (err, pack, key, done) {
  if (typeof pack === 'function') { return pack(err); }

  console.log(JSON.stringify(pack, null, 2));

  assert(pack.headers);
  assert(pack[key]);
  done(null, pack);
};
