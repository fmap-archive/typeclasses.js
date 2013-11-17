var _ = require('underscore');

module.exports.map = function(obj, fn) {
  _.each(obj, function(vs,k) {
    obj[k] = fn(vs);
  });
  return obj;
};
