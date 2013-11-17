var lib = require('../../../lib/typeclasses');
var instances = lib.retrieve(function(){},[
  'functor'
]);

describe("function functor instance", function() {
  var fmap = instances.functor.map;
  it("map should compose functions", function() {
    var s0 = function(x) { return x + 1; };
    var s1 = function(x) { return x + 2; };
    expect(fmap(s0,s1)(0)).toEqual(s0(s1(0)));
  });
});
