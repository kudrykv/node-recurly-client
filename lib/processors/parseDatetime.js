module.exports = function (str) {
  // 2016-08-03T15:44:05Z
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(str)) {
    return new Date(str).getTime();
  }

  return str;
};
