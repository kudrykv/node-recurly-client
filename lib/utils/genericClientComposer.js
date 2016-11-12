var _ = require('lodash');

var genericRequestCall = require('./genericRequestCall');

module.exports = function (schema, request, handler, host) {
  var module = {};

  _.forEach(schema, function (blueprint, method) {
    Object.defineProperty(module, method, {
      value: _.partial(genericRequestCall, request, handler, host, blueprint)
    })
  });

  return module;
};
