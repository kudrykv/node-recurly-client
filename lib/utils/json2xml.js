var _ = require('lodash');
var xml2js = require('xml2js');

module.exports = function (rootTag, json) {
  return new xml2js.Builder().buildObject(_.zipObject([rootTag], [json]));
};
