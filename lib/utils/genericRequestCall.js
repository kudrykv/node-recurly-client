var _ = require('lodash');
var xml2js = require('xml2js');

module.exports = function () {
  var args = Array.prototype.slice.call(arguments, 0);

  // This pack of variables is injected by the library itself. All that call `args.shift()`, basically.
  var request = args.shift(); // request library with default headers
  var handler = args.shift(); // request data handler
  var host = args.shift();
  /**
   * Schema sub-object.
   *
   * @type SubSchema
   */
  var blueprint = _.cloneDeep(args.shift());

  var urlParams = [];
  var bodyObj = {};
  var callback = undefined;

  _.forEach(args, function (arg) {
    if (_.isString(arg)) { return urlParams.push(arg); }
    if (_.isFunction(arg)) { return callback = arg; }
    if (_.isObject(arg)) { return bodyObj = arg; }
  });

  if (!callback) { throw new Error('Callback was not passed for URI ' + blueprint.request.uri); }

  // There is no reason to call Recurly if URI is not complete.
  var filledTemplate = fillTheTemplate(blueprint.request.uri, urlParams);
  if (filledTemplate.indexOf(':') >= 0) {
    return callback(new Error('Not enough parameters for URI: ' + filledTemplate));
  }

  blueprint.request.uri = host + filledTemplate;

  if (_.includes(['post', 'put'], blueprint.request.method.toLowerCase())) {
    if (_.has(blueprint, 'xml')) {
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

/**
 * @name SubSchema
 * @typedef SubSchema
 * @param {object} request - parameters for request.
 * @param {string} request.method - HTTP method. GET, POST, PUT or DELETE.
 * @param {string} request.uri - URI to call.
 * @param {object} [xml] - random XML parameters, if body should be passed.
 * @param {string} xml.root - root XML object to create.
 */