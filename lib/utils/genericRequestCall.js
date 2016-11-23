var _ = require('lodash');
var xml2js = require('xml2js');

module.exports = function () {
  var args = Array.prototype.slice.call(arguments, 0);

  var request = args.shift(); // request library with default headers
  var handler = args.shift(); // request data handler
  var host = args.shift();
  var blueprint = _.cloneDeep(args.shift());

  var urlParams = [];
  var bodyObj = {};
  var callback = undefined;

  _.forEach(args, function (arg) {
    if (_.isString(arg)) { return urlParams.push(arg); }
    if (_.isFunction(arg)) { return callback = arg; }
    if (_.isObject(arg)) { return bodyObj = arg; }
  });

  blueprint.request.uri = host + fillTheTemplate(blueprint.request.uri, urlParams);

  if (_.includes(['post', 'put'], blueprint.request.method.toLowerCase())) {
    if (_.has(blueprint.xml)) {
      blueprint.request.body = new xml2js.Builder().buildObject(_.zipObject([blueprint.xml.root], [bodyObj]));
    }
  } else {
    blueprint.request.qs = bodyObj;
  }

  request(blueprint.request, _.partialRight(handler, callback));
};

function fillTheTemplate(tpl, params) {
  _.forEach(params, function (param) {
    tpl = tpl.replace(/(:\w+)/, param);
  });

  return tpl;
}