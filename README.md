Typeclasses.js
==============

:warning: Rather useless, mostly proof-of-concept. :warning:

Typeclasses are generic interfaces that provide a common set of features for
different types of values. When similar structure is imposed over differently
typed values, and values sharing structure are known to share fundamental
behaviours, we can write functions largely agnostic to the values they receive
in terms of that common structure. This is a kind of ad-hoc polymorphism,
freeing us from lines and lines of case handling and boilerplate.

Monoid is one such example of a typeclass. In abstract algebra, a monoid is
defined as a three-tuple consisting of a set S, a binary operator +, and unit
e, such that (1) the set is closed under +, (2) + is associative, and (3)
e serves as left and right identity (there's no commutativity constraint.) For
example, the natural numbers form a monoid under both addition (e=0) and
multiplication (e=1.) Lists form a monoid under concatenation, with the empty
list as identity. As the symbol of the operator gives away a little bit,
a useful way of thinking about monoids is as adding things.

The monoid instances in this library call the identity `empty`, and the binary
operator `plus`, such that the list instance can be defined:

```javascript
{ plus: function(x,y) { return x.concat(y); }
, empty: []
}
```

Likewise, a lawful monoid instance for objects could operate on keys likeso:

```javascript
{ plus: function(x,y) { 
    for (var prop in y) {
      x[prop] = y[prop];
    }
    return x;
  } 
, empty: {}
}
```

(`plus` is equivalent to `_`'s `extend`.)

Given this common interface, we can write a generic function to reduce
a same-typed list of values to a single value using `plus`:

```javascript
function mconcat(xs) {
  var instances = retrieve(xs[0], ['monoid']);
  with(instances.monoid) {
    return xs.reduce(plus, zero);
  }
};
```

Monoid structure defined a relationship between same-typed values, regardless
of how they're persisted - lists? trees? Thus, `mconcat` can be generalised to
any structure that can be folded over. Due to a constraint in the current
implementation, we need a way of retrieving a term of the container's value:

```javascript
function fst(struct) {
  var instances = retrieve(struct, ['indexable'];
  with (instances.indexable) {
    return head(struct);
  };
};

function mconcat(struct) {
  var instances = retrieve(fst(struct), ['foldable', 'monoid']);
  with (instances) {
    return foldable.foldr(struct, monoid.plus, monoid.zero);
  };
};
```

Further, we could exploit the monoid's associativity requirement by
parallelising the fold operator (in the *divide-and-conquer* pattern), though
this is outside the scope of this tutorial..

Default instances
-----------------

    lib/typeclasses/
    |-- applicative
    |   |-- function.js 
    |   |-- list.js
    |   `-- object.js
    |-- foldable
    |   |-- list.js
    |   `-- object.js
    |-- function.js
    |-- functor
    |   |-- function.js
    |   |-- list.js
    |   `-- object.js
    |-- indexable
    |   |-- list.js
    |   `-- object.js
    |-- list.js
    |-- monad
    |   |-- function.js
    |   |-- list.js
    |   `-- object.js
    |-- monoid
    |   |-- list.js
    |   `-- object.js
    `-- object.js

Defining new instances and typeclasses
--------------------------------------

```javascript
> typeclasses().retrieve(3,['monoid']);
{ monoid: [Error: Missing monoid instance for Number!] }
> var product = { zero: 1, plus: function(x,y) { return x*y; }};
undefined
> typeclasses({Number:{monoid:product}}).retrieve(3,['monoid'])
{ monoid: { zero: 1, plus: [Function] } }
> function T(){};
> var t = new T();
> typeclasses({T:{functor:{map:function(){}}}}).retrieve(s,['functor']);
{ functor: { map: [Function] } }
```
