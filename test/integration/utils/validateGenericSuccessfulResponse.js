require('should');

module.exports = function validateGenericSuccessfulResponse (err, pack, standard, done) {
  if (typeof pack === 'function') { return pack(err); }

  console.log(JSON.stringify(pack, null, 2));

  pack.should.be.eql(standard);
  done(null, pack);
};
