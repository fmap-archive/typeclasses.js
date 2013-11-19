var _  = require('underscore');
var ls = require('./list.js');

module.exports.foldr = function(x,y,z) {
  return ls.foldr(_.values(x), y, z);
};

module.exports.foldl = function(x,y,z) {
  return ls.foldl(_.values(x), y, z);
};
