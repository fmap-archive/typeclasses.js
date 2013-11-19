var _    = require('underscore');

var type = function(obj) {
  if (typeof(obj) === "undefined") {
    return "Undefined";
  }
  var constructor = obj.constructor.toString();
  var pattern     = /^function ([^(]+)\(/;
  var matches     = pattern.exec(constructor);
  return (matches[1] || "");
};

var instances = {
  Array: require('./typeclasses/list'),
  Object: require('./typeclasses/object'),
  Function: require('./typeclasses/function')
};

var missingClass = function(name) {
  var msg = _.template("There aren't any instances for type <%=name%>!");
  return new Error(msg({name:name}));
};

var missingInstance = function(k,v) {
  var msg = _.template("Missing <%=tc%> instance for <%=type%>!");
  return new Error(msg({tc: k, type: type(v)}));
};

var retrieve = function(value, wants) {//pick
  var name = type(value);
  var types = instances[name] || missingType(name);
  var result = {};
  _.each(wants, function(name) {
    var type = types[name]; 
    result[name] = type!==undefined?type:missingInstance(name,value);
  });
  return result;
};


var endow = function(value, wants) {
  var instances = retrieve(value, wants);
  return _.extend(value, instances);
};


module.exports = function(opts) {
  instances = _.extend(instances, opts);
  return { 
    retrieve: retrieve, 
    endow: endow
  };
};
