var _ = require('underscore');

module.exports.head = function(xs) {
  var key = Object.keys(xs)[0];
  return _.pick(xs, key);
};

module.exports.tail = function(xs) {
  var key = Object.keys(xs)[0];
  return _.omit(xs, key);
};

module.exports.length = function(xs) {
  return Object.keys(xs).length;
};

module.exports.append = function(x,xs) {
  var fin = module.exports.head(x);
  return _.extend(xs, fin);
};
