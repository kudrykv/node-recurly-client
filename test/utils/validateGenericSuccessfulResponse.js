var assert = require('assert');

module.exports = function validateGenericSuccessfulResponse (err, pack, key, done) {
  if (typeof pack === 'function') { return pack(err); }

  assert(pack.headers);
  assert(pack[key]);
  done();
};
