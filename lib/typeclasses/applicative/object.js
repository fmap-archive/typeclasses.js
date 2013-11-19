var _       = require('underscore');
var functor = require('../functor/object');

// We treat objects as lists, each value corresponding to a list member.
// Keys are ignored (indeed, unlawfully), besides ensuring uniqueness.

module.exports.map = functor.map;
module.exports.pure = function(f) {
  return { pure: f };
}; 

module.exports.extract = function(x,y) {
  var ret = {};
  functor.map(x, function(f){
    _.each(y, function(v,k) {
      id = _.uniqueId(k);
      ret[id] = f(v);
    });
  });
  return ret;
};
