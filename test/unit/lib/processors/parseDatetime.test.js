require('should');

var parseTime = require('../../../../lib/processors/parseDatetime');

describe('parseTime', function () {
  it('should return timestamp', function timestamp () {
    parseTime('2016-08-03T15:44:05Z').should.be.eql(1470239045000);
  });

  it('should return the string', function randomString () {
    parseTime('1470239045000').should.be.eql('1470239045000');
    parseTime('2016-08-03T15:44:05.000Z').should.be.eql('2016-08-03T15:44:05.000Z');
    parseTime('random').should.be.eql('random');
  });
});