var assert = require('assert');

module.exports = function validateGenericFailureResponse (err, pack, done) {
  if (!err) { //noinspection NodeModulesDependencies
    return done('Error had to occur, got response instead: ' + JSON.stringify(pack));
  }

  assert(err.headers);
  assert(err.error || err.errors);
  pack(); // if error happened, all parameters would be shifted by one.
};
