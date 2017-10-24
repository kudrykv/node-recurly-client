var _ = require('lodash');
var request = require('request');
var xml2js = require('xml2js');

var parseDatetime = require('./processors/parseDatetime');
var configureRequestCallbackHandler = require('./utils/configureRequestCallbackHandler');
var createClient = require('./createClient');

/**
 * Create Recurly client.
 *
 * @param {object} config - parameters.
 * @param {string} config.apiKey - secret API key.
 * @param {string} config.subdomain - site subdomain.
 * @param {string} [config.apiVersion] - API version.
 * @param {boolean} [config.smartAssAssign] - be smart and assign returned instance from Recurly to the top
 *   body field.
 * @param {object} [xmlConfig] - parse options.
 * @see https://github.com/Leonidas-from-XIV/node-xml2js#options
 */
module.exports = function Recurly (config, xmlConfig) {
  config = _.defaults(config, {
    apiKey: '',
    subdomain: '',
    apiVersion: '2.4',
    smartAssAssign: false
  });

  xmlConfig = _.merge({
    explicitArray: false,
    ignoreAttrs: true,
    valueProcessors: [
      xml2js.processors.parseNumbers,
      xml2js.processors.parseBooleans,
      parseDatetime
    ]
  }, xmlConfig);

  var requestCallbackHandler = configureRequestCallbackHandler(config, xmlConfig);
  var host = 'https://' + config.subdomain + '.recurly.com';
  var requester = request.defaults({
    headers: {
      'Accept': 'application/xml',
      'X-Api-Version': config.apiVersion,
      'Content-Type': 'application/xml; charset=utf-8',
      'Authorization': 'Basic ' + new Buffer(config.apiKey + ':').toString('base64')
    }
  });

  return createClient(requester, requestCallbackHandler, host);
};

