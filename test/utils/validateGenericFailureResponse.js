var assert = require('assert');

module.exports = function validateGenericFailureResponse (err, pack, done) {
  if (!err) {
    console.error(pack);
    return done('Error had to occur, got response instead');
  }

  console.log(JSON.stringify(err.error) || JSON.stringify(err.errors));

  assert(err.headers);
  assert(err.error || err.errors);

  pack(); // if error happened, all parameters would be shifted by one.
};
