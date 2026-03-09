## 1. Explain the diff between the below two cases.

<img width="1382" height="343" alt="image" src="https://github.com/user-attachments/assets/d941c5fb-04c4-4081-8166-a8cd3b310c11" />

What your notes are describing is the difference between accessing a variable vs accessing a property on an object in JavaScript.

Your example:
```
console.log(x);        // ReferenceError: x is not defined
console.log(window.x); // undefined
```

Let's break down why this happens.

1️⃣ **console.log(x) → ReferenceError**

When JavaScript sees:

console.log(x);

**the engine tries to resolve the variable x in the scope chain.**

The lookup order is: Current scope --> Parent scope --> Global scope

If the variable does not exist anywhere, JavaScript throws: **ReferenceError: x is not defined**. This happens because the identifier itself does not exist in memory.

Example:
```
console.log(x);
```
There is no declaration like
```
let x;
var x;
const x;
```

So JS throws an error.

2️⃣ **console.log(window.x) → undefined**

Now look at this:

console.log(window.x);

Here JavaScript is doing something different.It is accessing a property on an object.**window is the global object in browsers.**

So JS checks:Does window have property "x" ? If it doesn't exist, **JavaScript simply returns:undefined** because accessing a **missing object property returns undefined.**


## Tricky Hoisting Questions that even experienced JavaScript developers often get wrong.

1. **Function Declaration vs Function Expression**
```
foo();

var foo = function () {
  console.log("Hello");
};
```
O/P: TypeError: foo is not a function

2. **Variable vs Function Declaration**
```
var foo = 1;

function foo() {
  console.log(2);
}

console.log(foo);
```
O/P: 1

3. **Hoisting Inside Functions (The Classic Trap)**
```
var x = 10;

function test() {
  console.log(x);
  var x = 20;
}

test();
```
O/P: undefined

4. **Bonus One (Very Famous Interview Question)**
```
var a = 1;

function test() {
  console.log(a);
  var a = 2;
  console.log(a);
}

test();
```
O/P: undefined
2

**Because the engine sees it as:**
```
function test() {
  var a;
  console.log(a);
  a = 2;
  console.log(a);
}
```

## The Hoisting Rule (Remember This)

During creation phase, there is a Priority order:

1️⃣ Function declarations
2️⃣ var declarations
3️⃣ let / const (temporal dead zone)


## One Question That Even Senior Engineers Fail

What will this print?
```
var foo = 1;

function foo() {
  console.log(2);
}

foo();
```

- Most people say 1.
- Actual answer is a **runtime error.**


##

```
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), i * 1000);
}
```

O/P: 
3
3
3

Reason:
- var is function scoped, not block scoped. So there is only one i variable shared across all iterations.
- Closures capture variables by reference, not by value. And since var creates one shared variable, every callback reads the final value (3).

### Important point: The function captures the variable i, not the value. So each callback remembers: i → reference to the same variable


## Why let Changes Everything

If we write:
```
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), i * 1000);
}
```

Output becomes the following because let creates a new i for every iteration:
```
0
1
2
```
