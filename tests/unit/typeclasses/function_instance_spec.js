var lib = require('../../../lib/typeclasses');
var instances = lib.retrieve(function(){},[
  'functor', 'applicative', 'monad'
]);

describe("function functor instance", function() {
  var fmap = instances.functor.map;
  it("map should compose functions", function() {
    var s0 = function(x) { return x + 1; };
    var s1 = function(x) { return x + 2; };
    expect(fmap(s0,s1)(0)).toEqual(s0(s1(0)));
  });
});

describe("function applicative instance", function() {
  var fmap = instances.functor.map;
  var pure = instances.applicative.pure;
  var extract = instances.applicative.extract;
  it("pure", function(){
    var fn = pure(42);
    expect(fn(23)).toEqual(42);
  });
  it("extract", function(){
      var a3  = fmap(function(x){return x+3;},
                     function(x,y){return x+y;});
      var m1k = function(x) { return x*100; };
      expect(extract(a3,m1k)(5)).toEqual(508);
  });
});

describe("function monad instance", function() {
  var bind = instances.monad.bind;
  it("bind", function(){
    var c = bind(function(x){return x+3;}, 
                 function(x,y){return x+y;}); 
    expect(c(3)).toBe(9);
  });
});
