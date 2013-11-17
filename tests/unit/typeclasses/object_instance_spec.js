var lib = require('../../../lib/typeclasses');
var instances = lib.retrieve({},['functor']);

describe("object functor instance", function() {
  var fmap = instances.functor.map;
  it("map should apply the function to each element", function() {
    var t0 = fmap({a:1,b:2}, function(x){return (x+1);});
    expect(t0).toEqual({a:2,b:3});

    var comp0 = fmap({a:1,b:2},function(f) { return f+1+2; });
    var comp1 = fmap(fmap({a:1,b:2},function(f) { return f+1; }) ,function(f) { return f+2; });
    expect(comp0).toEqual(comp1);
  });
});
