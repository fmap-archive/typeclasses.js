module.exports.add = function(x,y) { 
  return x+y; 
};

module.exports.succ = function(x) { 
  return function(y) {
    return x+y;
  };
};

module.exports.pred = function(x) { 
  return function(y) {
    return y-x;
  };
};

module.exports.identity = function(x) { 
  return x; 
};

module.exports.pmult = function(x) { 
  return function(y) {
    return x*y;
  };
};

module.exports.join = function(x,y) {
  return x.concat(y);
};
