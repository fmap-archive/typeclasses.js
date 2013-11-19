var hf = require('../helpers/function_helper');
var hi = require('../helpers/interface_helper');
var instances = hi.retrieve([],[
  'functor', 'applicative', 'monad', 'foldable', 'indexable', 'monoid'
]);

describe("list functor instance", function() {
  var fmap = instances.functor.map;
  it("fmap should apply the function to each element of the list", function() {
    var succ = fmap([1,2,3], hf.identity);
    expect(succ).toEqual([1,2,3]);
    var comp0 = fmap([1,2,3],hf.succ(3));
    var comp1 = fmap(fmap([1,2,3],hf.succ(1)),hf.succ(2));
    expect(comp0).toEqual(comp1);
  });
});

describe("list applicative instance", function() {
  var pure = instances.applicative.pure;
  var extract = instances.applicative.extract;

  it("pure should embed pure expressions", function(){
    expect(pure(hf.identity)).toEqual([hf.identity]);
    expect(pure(1)).toEqual([1]);
  });
  it("extract should sequence computations and combine their results", function() {
    expect(extract(pure(hf.identity),[1])).toEqual([1]);
    var fns=[ hf.succ(1), hf.succ(2) ];
    expect(extract(fns, [1])).toEqual([2,3]);
  });
});

describe("list monad instance", function() {
  var bind = instances.monad.bind;
  it("bind", function() {
     var list = [1,2,3];
     var res = bind(list, function(x) { return [x,-x]; });
     expect(res).toEqual([1,-1,2,-2,3,-3]);
  });
});
describe("list foldable instance", function() {
  var foldr = instances.foldable.foldr;
  var foldl = instances.foldable.foldl;
  it("folds", function(){
    var s0 = foldr([1,2,3], hf.add, 9);
    expect(s0).toEqual(15);
    var s1 = foldl([[1],[2]], hf.join, []);
    expect(s1).toEqual([1,2]);
  });
});
describe("list indexable instance", function() {
  var head = instances.indexable.head;
  var tail = instances.indexable.tail;
  var length = instances.indexable.length;
  var append = instances.indexable.append;
  it("head", function() {
    expect(head([2,3,4])).toEqual(2);
  });
  it("tail", function() {
    expect(tail([2,3,4])).toEqual([3,4]);
  });
  it("length", function() {
    expect(length([2,3,4])).toEqual(3);
  });
  it("append", function() {
    expect(append(2, [3,4])).toEqual([3,4,2]);
  });
});
describe("list monoid instance", function() {
  var plus = instances.monoid.plus;
  var zero = instances.monoid.zero;
  it("plus", function() {
    expect(plus([1,2,3],[3,4])).toEqual([1,2,3,3,4]);
  });
  it("zero", function() {
    expect(plus([1,2,3],zero)).toEqual([1,2,3]);
  });
});
