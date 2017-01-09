var _ = require('lodash');
var json2xml = require('./json2xml');

/**
 * Function for internal use to dynamically parse parameters.
 * Parameters go in this order:
 * 0. Internal library parameters (arguments[0; 3])
 *
 * User parameters (arguments[4; ∞)):
 * 1. Separate string parameters for each placeholder in the URI.
 * 2. JSON object, that will be used as a query string or XML body (depending on the method, accordingly).
 * 3. The callback.
 *
 * If callback is not passed, method raises an exception. It's dirty, but fuck you. One should always
 * pass the callback.
 */
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

  // There is no reason to call Recurly if number of parameter for URI mismatch their actual number.
  var parametersInUri = (blueprint.request.uri.match(/:/g) || []).length;
  if (parametersInUri !== urlParams.length) {
    return callback(new Error('Mismatch number of parameters in URI: ' + blueprint.request.uri + ' ' + urlParams));
  }

  var filledTemplate = fillTheTemplate(blueprint.request.uri, urlParams);
  blueprint.request.uri = host + filledTemplate;

  if (_.includes(['post', 'put'], blueprint.request.method.toLowerCase())) {
    if (_.has(blueprint, 'xml')) {
      blueprint.request.body = json2xml(blueprint.xml.root, bodyObj);
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