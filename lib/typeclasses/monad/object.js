var _           = require('underscore');
var functor     = require('../functor/object');
var applicative = require('../applicative/object');

module.exports.map = functor.map;
module.exports.pure = applicative.pure;
module.exports.extract = applicative.extract;

module.exports.bind = function(o,c) {
  var ret = {};
  _.each(o, function(x,y) {
    _.each(_.values(c(x)), function(v){
      var id = _.uniqueId(y);
      ret[id]=v;
    });
  });
  return ret;
};

// return _.flatten(value.map(callback), true);
