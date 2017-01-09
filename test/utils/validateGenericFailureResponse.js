require('should');
var assert = require('assert');

module.exports = function validateGenericFailureResponse (err, pack, standard, done) {
  if (!err) {
    console.error(pack);
    return done('Error had to occur, got response instead');
  }

  console.log(err);
  err.should.be.eql(pack);

  standard(); // if error happened, all parameters would be shifted by one.
};
