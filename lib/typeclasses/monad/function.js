var _           = require('underscore');
var functor     = require('../functor/function');
var applicative = require('../applicative/function');

module.exports.map = functor.map;
module.exports.pure = applicative.pure;
module.exports.extract = applicative.extract;

module.exports.bind = function(f,k) {
  return function(r) {
    return k(f(r),r);
  };
};
