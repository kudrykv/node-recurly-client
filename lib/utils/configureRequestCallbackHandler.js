var xml2js = require('xml2js');
var parseString = xml2js.parseString;

module.exports = function (config, xmlConfig) {
  return function (err, res, xml, done) {
    if (typeof res === 'function') {
      return res(err);
    }

    parseString(xml, xmlConfig, function (err, json) {
      if (err) { return done(err); }

      var body;

      if (config.smartAssAssign) {
        body = {headers: res.headers};

        var topLevelKey = _.keys(json).pop();
        var entity = json[topLevelKey];
        var secondLevelKeys = _.keys(entity);
        body.body = secondLevelKeys.length > 1 ? entity : [].concat(entity[secondLevelKeys.pop()]);
      } else {
        body = json || {};
        body.headers = res.headers;
      }

      if (res.statusCode >= 200 && res.statusCode < 300) {
        return done(null, body);
      }

      done(body);
    });
  }
};
