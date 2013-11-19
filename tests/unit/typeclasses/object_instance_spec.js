var _ = require('underscore');
var lib = require('../../../lib/typeclasses');
var instances = lib.retrieve({},['functor', 'monoid', 'foldable', 
                                 'indexable', 'applicative', 'monad']);
var identity = function(x) { return x; };

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

describe("object monoid instance", function() {
  var zero = instances.monoid.zero;
  var plus = instances.monoid.plus;

  it("zero", function(){
    expect(plus({lol:1},zero)).toEqual({lol:1});
    expect(plus(zero,{lol:1})).toEqual({lol:1});
  });
  it("plus", function(){
    expect(plus({a:2,b:3},{b:5,c:6})).toEqual({a:2,b:5,c:6});
  });
});

describe("object foldable instance", function() {
  var foldr = instances.foldable.foldr;
  var foldl = instances.foldable.foldl;
  it("folds", function() {
    var add = function(x,y) { return x+y; };
    expect(foldr({a:2,b:3,c:3}, add, 9)).toEqual(17);
    expect(foldl({a:2,b:3,c:3}, add, 9)).toEqual(17);
  });
});

describe("object indexable instance", function() {
  var head = instances.indexable.head;
  var tail = instances.indexable.tail;
  var length = instances.indexable.length;
  var append = instances.indexable.append;
  it("head", function(){
    expect(head({a:1,b:2,c:3})).toEqual({a:1});
    expect(head({})).toEqual({});
  });
  it("tail", function(){
    expect(tail({a:1,b:2,c:3})).toEqual({b:2,c:3});
  });
  it("length", function() {
    expect(length({a:1,b:2,c:3})).toEqual(3);
    expect(length({})).toEqual(0);
  });
  it("append", function() {
    expect(append({c:3},{a:1,b:2})).toEqual({a:1,b:2,c:3});
  });
});

describe("object applicative instance", function() {
  var pure = instances.applicative.pure;
  var extract = instances.applicative.extract;
  it("pure", function() {
    expect(pure(0)).toEqual({pure: 0});
  });
  it("extract", function() {
    var fn = {succ: function(x){return x+1;}, 
              pred: function(x){return x-1;}};
    var xs = {a:1,b:2};
    var r0 = extract(fn,xs);
    expect(_.values(r0)).toEqual([2,3,0,1]);
    var r1 = extract(pure(identity),xs);
    expect(_.values(r1)).toEqual(_.values(xs));
  });
});

describe("object monad instance", function() {
  var bind = instances.monad.bind;
  it("bind", function(){
    var object = {a: 1, b: 2, c: 3};
    var res = bind(object, function(x) { return {a:x,b:-x}; });
    expect(_.values(res)).toEqual([1,-1,2,-2,3,-3]);
  });
});
