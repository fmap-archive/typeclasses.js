var hf = require('../helpers/function_helper');
var hi = require('../helpers/interface_helper');
var instances = hi.retrieve(hf.identity, [
  'functor', 'applicative', 'monad'
]);

describe("function functor instance", function() {
  var fmap = instances.functor.map;
  it("map should compose functions", function() {
    var s0 = hf.succ(1);
    var s1 = hf.succ(2);
    expect(fmap(s0,s1)(0)).toEqual(s0(s1(0)));
  });
});

describe("function applicative instance", function() {
  var fmap = instances.functor.map;
  var pure = instances.applicative.pure;
  var extract = instances.applicative.extract;
  it("pure", function(){
    var f = pure(42);
    expect(f(23)).toEqual(42);
  });
  it("extract", function(){
    var p3  = fmap(hf.succ(3), hf.add);
    var mk  = hf.pmult(1e2);
    var res = extract(p3, mk)(5);
    expect(res).toEqual(508);
  });
});

describe("function monad instance", function() {
  var bind = instances.monad.bind;
  it("bind", function(){
    var res = bind(hf.succ(3), hf.add)(3);
    expect(res).toBe(9);
  });
});
