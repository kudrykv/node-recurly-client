var _ = require('lodash');
var request = require('request');
var xml2js = require('xml2js');
var parseString = xml2js.parseString;

var parseDatetime = require('./processors/parseDatetime');

/**
 * Create Recurly client.
 *
 * @param {object} config - parameters.
 * @param {string} config.api_key - secret API key.
 * @param {string} config.subdomain - site subdomain.
 * @param {string} [config.api_version] - API version.
 * @param {object} [xmlConfig] - parse options.
 * @see https://github.com/Leonidas-from-XIV/node-xml2js#options
 */
module.exports = function Recurly (config, xmlConfig) {
  _.defaults(config, {
    api_key: '',
    subdomain: '',
    api_version: '2.4'
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

  var host = 'https://' + config.subdomain + '.recurly.com';
  var requester = request.defaults({
    headers: {
      'Accept': 'application/xml',
      'X-Api-Version': config.api_version,
      'Content-Type': 'application/xml; charset=utf-8',
      'Authorization': new Buffer(config.api_key + ':').toString('base64')
    }
  });

  var requestCallbackHandler = function (err, res, xml, done) {
    if (typeof res === 'function') {
      return res(err);
    }

    parseString(xml, xmlConfig, function (err, json) {
      if (err) { return done(err); }

      json.headers = res.headers;
      if (res.statusCode >= 200 && res.statusCode < 300) {
        return done(null, json);
      }

      done(json);
    });
  };

  return {
    accounts: {
      lookup: function (accountCode, done) {
        requester({
          method: 'GET',
          uri: host + '/v2/accounts/' + accountCode
        }, _.partialRight(requestCallbackHandler, done));
      }
    }
  };
};
