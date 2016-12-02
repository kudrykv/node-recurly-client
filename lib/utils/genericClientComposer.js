var _ = require('lodash');

var genericRequestCall = require('./genericRequestCall');

module.exports = function (schema, request, handler, host) {
  var callee = {};

  _.forEach(schema, function (blueprint, method) {
    Object.defineProperty(callee, method, {
      value: _.partial(genericRequestCall, request, handler, host, blueprint)
    })
  });

  return callee;
};
