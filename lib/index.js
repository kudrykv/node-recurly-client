var _ = require('lodash');
var request = require('request');
var xml2js = require('xml2js');

var parseDatetime = require('./processors/parseDatetime');
var configureRequestCallbackHandler = require('./utils/configureRequestCallbackHandler');

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
  _.defaults(config, {
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
      'Authorization': new Buffer(config.apiKey + ':').toString('base64')
    }
  });

  return {
    accounts: {
      lookup: function (accountCode, done) {
        requester({
          method: 'GET',
          uri: host + '/v2/accounts/' + accountCode
        }, _.partialRight(requestCallbackHandler, done));
      },

      list: function (options, done) {
        if (typeof options === 'function') { done = options; }

        requester({
          method: 'GET',
          uri: host + '/v2/accounts'
        }, _.partialRight(requestCallbackHandler, done));
      },

      create: function (details, done) {
        var builder = new xml2js.Builder();

        requester({
          method: 'POST',
          uri: host + '/v2/accounts',
          body: builder.buildObject({account: details})
        }, _.partialRight(requestCallbackHandler, done));
      },

      close: function (accountCode, done) {
        requester({
          method: 'DELETE',
          uri: host + '/v2/accounts/' + accountCode
        }, _.partialRight(requestCallbackHandler, done));
      },

      reopen: function (accountCode, done) {
        requester({
          method: 'PUT',
          uri: host + '/v2/accounts/' + accountCode + '/reopen'
        }, _.partialRight(requestCallbackHandler, done));
      },

      balance: function (accountCode, done) {
        requester({
          method: 'GET',
          uri: host + '/v2/accounts/' + accountCode + '/balance'
        }, _.partialRight(requestCallbackHandler, done));
      },

      notes: function (accountCode, done) {
        requester({
          method: 'GET',
          uri: host + '/v2/accounts/' + accountCode + '/notes'
        }, _.partialRight(requestCallbackHandler, done));
      }
    }
  };
};

