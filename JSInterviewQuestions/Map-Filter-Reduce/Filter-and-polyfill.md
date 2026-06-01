# Notes: `filter` Polyfill, `context`, `thisArg`, and Arrow Function Issue

## 1. What is `filter` supposed to do?

Native `filter()` creates a **new array** containing only the elements for which the callback returns a truthy value.

```js
let arr = [1, 2, 3, 4, 5];

let result = arr.filter(function(num) {
  return num % 2 === 0;
});

console.log(result); // [2, 4]
```
Syntax:
```
array.filter(callback,ThisArg)
```
Callback receives three arguments:

```js
callback(currentValue, index, originalArray)
```

Example:

```js
[10, 20, 30].filter(function(value, index, array) {
  console.log(value, index, array);
  return true;
});
```

Output:

```js
10 0 [10, 20, 30]
20 1 [10, 20, 30]
30 2 [10, 20, 30]
```

---

# 2. Simple Polyfill

This is the simple version, good for interviews :

```js
Array.prototype.myFilter = function(callback, context) { //filter accepts callback and context
  let arr = [];

  for (let i = 0; i < this.length; i++) {
    if (callback.call(context, this[i], i, this)) {
      arr.push(this[i]);
    }
  }

  return arr;
};
```

Usage:

```js
let arr2 = [1, 2, 4, 5, 6, 7, 8];

let ans = arr2.myFilter(function(num) {
  return num % 2 === 0;
});

console.log(ans); // [2, 4, 6, 8]
```

This works for normal arrays.

---

# 3. What `callback.call(context, this[i], i, this)` Means

This line:

```js
callback.call(context, this[i], i, this)
```

means call the function :

```js
callback(currentValue, index, originalArray)
```
but with a custom `this` value.

The first argument to `.call()` decides what `this` should be inside the callback.

```js
callback.call(context, value, index, array)
```

So inside a normal callback function:

```js
this === context
```

---

# 4. Why Do We Need `context`/`thisArg`?

`context` is the optional second argument passed to filter, also called `thisArg`(native name).

It lets you use an object as `this` inside the callback .

Example:

```js
let context = {
  limit: 25
};

let result = [10, 20, 30, 40].myFilter(function(num) {
  return num > this.limit; // here this =  context, which has the limit property
}, context);

console.log(result); // [30, 40]
```

Here:

```js
this.limit
```

means:

```js
context.limit
```

because your polyfill uses:

```js
callback.call(context, value, index, array)
```
## 4.1 Context and normal callback vs arrow function callback

`context` Works with Normal Function Callback

Example:

```js
let context = {
  limit: 25
};

let result = [10, 20, 30, 40].myFilter(function(num) {
  return num > this.limit;
}, context);

console.log(result); // [30, 40]
```
### Problem with Arrow Function Callback

Arrow functions do **not** have their own `this`.They take `this` from their surrounding scope.

So this will not work as expected:

```js
let context = {
  limit: 25
};

let result = [10, 20, 30, 40].myFilter((num) => {
  return num > this.limit;
}, context);

console.log(result);
```

You might expect:

```js
[30, 40]
```

But that is not guaranteed.

Because this:

```js
this.limit
```

does **not** refer to:

```js
context.limit
```

The arrow function ignores:

```js
callback.call(context, ...)
```
Example:
```js
let context = {
  limit: 25
};

let result = [10, 20, 30, 40].myFilter((num) => {
  console.log(this);
  return num > this.limit;
}, context);

console.log(result);
```

In many environments, `this` will not be `context`.

So:

```js
this.limit
```

may be:

```js
undefined
```

Then:

```js
num > undefined
```

becomes false.

Result may be:

```js
[]
```

In stricter environments, it may even throw an error if `this` is `undefined`.
### Solution 1: Use Normal Function with `context`

If you want to use `thisArg`, use a normal function.

```js
let context = {
  limit: 25
};

let result = [10, 20, 30, 40].myFilter(function(num) {
  return num > this.limit;
}, context);

console.log(result); // [30, 40]
```

This is the correct solution when using `context` as `thisArg`.

---

### Solution 2: Use Arrow Function with Closure

If you want to use an arrow function, do not use `this`.

Use the variable directly.

```js
let context = {
  limit: 25
};

let result = [10, 20, 30, 40].myFilter((num) => {
  return num > context.limit;
});

console.log(result); // [30, 40]
```

Shorter version:

```js
let result = [10, 20, 30, 40].myFilter(num => num > context.limit);

console.log(result); // [30, 40]
```

Here, the arrow function accesses `context` through closure.

It does not need `thisArg`.

---


# 5. Simple Polyfill Limitation

Your simple version is good for basic understanding, but it is not fully native-like(A native method is a method already provided by JavaScript.).
Since we are writing a polyfill, we want our method to behave as close as possible to a native method.
Native array methods are non-enumerable.So our polyfill should also be non-enumerable, but currently it is not, although it is good enough high level implementation for interviews.
```js
Array.prototype.myFilter = function(callback, context) {
  let arr = [];

  for (let i = 0; i < this.length; i++) {
    if (callback.call(context, this[i], i, this)) {
      arr.push(this[i]);
    }
  }

  return arr;
};
```

Problems:

```js
1. It adds myFilter as an enumerable property.
2. It does not check if callback is a function.
3. It does not handle null or undefined properly.
4. It does not skip holes in sparse arrays.
5. It does not convert this to an object for array-like values.
6. It keeps reading this.length during every loop iteration.
```

---

## 5.1 . Problem: Direct Assignment Makes `myFilter` Enumerable

When you write:

```js
Array.prototype.myFilter = function() {};
```

you add `myFilter` directly to `Array.prototype`.

This creates a property like this:

```js
{
  writable: true,
  enumerable: true,
  configurable: true
}
```

The important part is:

```js
enumerable: true
```

That means `myFilter` may show up when looping with `for...in`.

Example:

```js
Array.prototype.myFilter = function() {};

let arr = [10, 20, 30];

for (let key in arr) {
  console.log(key);
}
```

Possible output:

```js
0
1
2
myFilter
```

That is not good because native array methods like `filter`, `map`, `forEach`, `push`, and `pop` do **not** show up in `for...in`.



### 5.1.1 What Does Enumerable Mean?

Enumerable means:

> The property is visible when JavaScript lists properties.

Example:

```js
let user = {
  name: "Amit",
  age: 25
};

console.log(Object.keys(user));
```

Output:

```js
["name", "age"]
```

Both `name` and `age` are enumerable.

But if you create a non-enumerable property:

```js
let user = {
  name: "Amit",
  age: 25
};

Object.defineProperty(user, "password", {
  value: "secret",
  enumerable: false
});

console.log(user.password); // secret
console.log(Object.keys(user)); // ["name", "age"]
```

The property exists, but it does not appear during key listing.

So:

```js
enumerable: true
```

means visible during enumeration.

```js
enumerable: false
```

means hidden during enumeration.

---

# 6. Close-to-Native Polyfill

A better version is:

```js
Object.defineProperty(Array.prototype, "myFilter", {
  value: function(callback, context) {
    "use strict";

    if (this == null) {
      throw new TypeError("Array.prototype.myFilter called on null or undefined");
    }

    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    let obj = Object(this);// native array methods are generic. They can work on array-like values too.
    let length = obj.length >>> 0;
    let result = [];

    for (let i = 0; i < length; i++) {
      if (i in obj) {
        let value = obj[i];

        if (callback.call(context, value, i, obj)) {
          result.push(value);
        }
      }
    }

    return result;
  },
  writable: true,
  enumerable: false,
  configurable: true
});
```
Small note:
```obj.length >>> 0```
is a common interview-friendly way to convert length to a non-negative integer. A perfect modern spec implementation uses a more accurate ToLength operation, but >>> 0 is usually acceptable for interviews.

Example for filter being clled with array like value
```
let obj = {
  0: "a",
  1: "b",
  2: "c",
  length: 3
};

Array.prototype.myFilter.call(obj, function(value) {
  return value !== "b";
});
```
Our filter will convert it using ``` let obj = Object(this);```
Then we safely use:
```
obj.length
obj[i]
i in obj
```
---

# 7. Why This Version Is Better

## 1. It uses `Object.defineProperty`

```js
Object.defineProperty(Array.prototype, "myFilter", {
  value: function() {},
  writable: true,
  enumerable: false,
  configurable: true
});
```

This makes `myFilter` non-enumerable, like native methods.

So this:

```js
let arr = [10, 20, 30];

for (let key in arr) {
  console.log(key);
}
```

prints:

```js
0
1
2
```

Not:

```js
myFilter
```

---

## 2. It checks if callback is a function

Native `filter` expects a function.

This should throw an error:

```js
[1, 2, 3].myFilter(null);
```

So we add:

```js
if (typeof callback !== "function") {
  throw new TypeError(callback + " is not a function");
}
```

---

## 3. It handles `null` and `undefined`

This should not be allowed:

```js
Array.prototype.myFilter.call(null, function(x) {
  return x;
});
```

So we add:

```js
if (this == null) {
  throw new TypeError("Array.prototype.myFilter called on null or undefined");
}
```

This catches both:

```js
null
undefined
```

---

## 4. It converts `this` to an object

```js
let obj = Object(this);
```

Native `filter` can work on array-like values, not just arrays.

Example:

```js
let obj = {
  0: "apple",
  1: "banana",
  2: "mango",
  length: 3
};

let result = Array.prototype.myFilter.call(obj, function(item) {
  return item.includes("a");
});

console.log(result); // ["apple", "banana", "mango"]
```

This works because we use:

```js
Object(this)
```

and then read:

```js
obj.length
obj[i]
```

---

## 5. It stores length once

```js
let length = obj.length >>> 0;
```

Native `filter` reads the length once at the start.

Example:

```js
let arr = [1, 2, 3];

let result = arr.myFilter(function(value, index, array) {
  array.push(100);
  return true;
});

console.log(result); // [1, 2, 3]
console.log(arr);    // [1, 2, 3, 100, 100, 100]
```

Even though new values are pushed, the filter only processes the original length.

---

## 6. It skips holes in sparse arrays

A sparse array has missing indexes.

Example:

```js
let arr = [1, , 3];
```

Native `filter` skips the empty slot.

So this:

```js
let result = arr.myFilter(function(value) {
  return true;
});

console.log(result);
```

should output:

```js
[1, 3]
```

That is why we use:

```js
if (i in obj)
```

This checks whether the index actually exists.

Important difference:

```js
let arr = [undefined];

arr.myFilter(function(value) {
  return true;
});
```

Output:

```js
[undefined]
```

An actual `undefined` value should not be skipped.

But a hole should be skipped.

That is why this is correct:

```js
if (i in obj)
```

and this is wrong:

```js
if (obj[i] !== undefined)
```


Better because:

```js
1. myFilter is non-enumerable like native methods.
2. It checks callback type.
3. It handles null and undefined correctly.
4. It works on array-like objects.
5. It skips holes in sparse arrays.
6. It supports context / thisArg.
7. It stores length once.
```

---

# 8. Best Interview Explanation

A simple `filter` polyfill loops through the array, calls the callback for each element, and pushes the element into a result array if the callback returns a truthy value.

We use:

```js
callback.call(context, value, index, array)
```

so that the optional `context` can become `this` inside a normal callback function.

However, arrow functions ignore `thisArg`, `call`, `apply`, and `bind`, because arrow functions get `this` from their surrounding lexical scope. So if we use an arrow callback, we should access the context variable directly using closure.

For a more native-like polyfill, we use `Object.defineProperty` instead of direct assignment because direct assignment makes the method enumerable. Native array methods are non-enumerable, so our polyfill should also be non-enumerable.
