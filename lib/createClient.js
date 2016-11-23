var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var genericClientComposer = require('./utils/genericClientComposer');

var dirName = 'schemas';
var schemas = fs.readdirSync(path.join(__dirname, dirName));

module.exports = function (requester, requestCallbackHandler, host) {
  return _.chain(schemas).map(function (filename) {
    var methodName = filename.split('.')[0];
    var schema = require('.' + path.sep + dirName + path.sep + methodName);

    return [methodName, genericClientComposer(schema, requester, requestCallbackHandler, host)];
  }).fromPairs().value();
};