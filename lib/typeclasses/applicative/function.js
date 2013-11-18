var _ = require('underscore');
var functor = require('../functor/function');

module.exports.map = functor.map;

module.exports.pure = function(f) {
  return function(x) { return f; };
}; //const

module.exports.extract = function(f,g) {
  return function(x) { return f(x,g(x)); };
}; //S
