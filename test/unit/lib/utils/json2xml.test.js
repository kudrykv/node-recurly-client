require('should');

var json2xml = require('../../../../lib/utils/json2xml');

var randomObj = {
  hello: 'world',
  stylish: {
    $: {attr: 'value'},
    _: 'guts'
  },
  items: {
    item: ['goose', 'shoose', 'abuse']
  }
};

var expected = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<root>\n  <hello>world</hello>\n  <stylish attr="value">guts</stylish>\n  <items>\n    <item>goose</item>\n    <item>shoose</item>\n    <item>abuse</item>\n  </items>\n</root>';

describe('json2xml', function () {
  it('should convert json 2 xml', function objectToXml () {
    json2xml('root', randomObj).should.be.eql(expected);
  });
});