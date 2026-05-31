# JavaScript Notes: Data Types, Type Coercion, Truthy/Falsy, and `==`

## 1. JavaScript Data Types

JavaScript data types are divided into two main categories:

```js
1. Primitive types
2. Reference types / non-primitive types
```

---

# 2. Primitive Data Types

Primitive values are simple values. They are copied by value.

JavaScript has **7 primitive data types**:

```js
string
number
boolean
undefined
null
bigint
symbol
```

---

## 2.1 String

Used for text.

```js
let name = "Amit";
let city = 'Delhi';
let message = `Hello ${name}`;
```

Check type:

```js
typeof "hello"; // "string"
```

Example:

```js
let username = "Rahul";

console.log(username);        // Rahul
console.log(typeof username); // string
```

---

## 2.2 Number

Used for integers and decimals.

```js
let age = 25;
let price = 99.99;
let temperature = -10;
```

Check type:

```js
typeof 100;  // "number"
typeof 10.5; // "number"
```

Special number values:

```js
Infinity
-Infinity
NaN
```

Example:

```js
console.log(10 / 0);      // Infinity
console.log("abc" * 2);   // NaN
console.log(typeof NaN);  // "number"
```

Important:

```js
NaN
```

means **Not a Number**, but its type is still:

```js
"number"
```

---

## 2.3 Boolean

Boolean has only two values:

```js
true
false
```

Example:

```js
let isLoggedIn = true;
let isAdmin = false;

console.log(typeof isLoggedIn); // "boolean"
```

Used mostly in conditions:

```js
let age = 18;

if (age >= 18) {
  console.log("Adult");
}
```

---

## 2.4 Undefined

A variable is `undefined` when it is declared but no value is assigned.

```js
let x;

console.log(x);        // undefined
console.log(typeof x); // "undefined"
```

A function also returns `undefined` if it does not return anything.

```js
function greet() {
  console.log("Hello");
}

let result = greet();

console.log(result); // undefined
```

---

## 2.5 Null

`null` means intentional empty value.

```js
let user = null;
```

It means the developer intentionally assigned “no value”.

Example:

```js
let selectedProduct = null;
```

Important interview point:

```js
typeof null; // "object"
```

This is a historical JavaScript bug.

Difference between `undefined` and `null`:

```js
let a;
let b = null;

console.log(a); // undefined
console.log(b); // null
```

| Value       | Meaning                                  |
| ----------- | ---------------------------------------- |
| `undefined` | Variable declared but value not assigned |
| `null`      | Intentional empty value                  |

---

## 2.6 BigInt

`BigInt` is used for very large integers.

```js
let bigNumber = 12345678901234567890n;
```

The `n` at the end makes it a BigInt.

```js
console.log(typeof 123n); // "bigint"
```

Example:

```js
let a = 9007199254740991n;
let b = 10n;

console.log(a + b); // 9007199254741001n
```

You cannot directly mix `BigInt` and `Number`.

```js
let a = 10n;
let b = 5;

console.log(a + b); // TypeError
```

Correct way:

```js
console.log(a + BigInt(b)); // 15n
```

This is **explicit conversion**, not automatic coercion.

You manually converted `b`:

```js
BigInt(b)
```

JavaScript does **not** automatically convert `Number` to `BigInt` during arithmetic.

---

## 2.7 Why does JavaScript not automatically convert Number to BigInt?

For small whole numbers, converting `Number` to `BigInt` is safe:

```js
BigInt(5); // 5n
```

But not every `Number` can safely become a `BigInt`.

Example with decimal:

```js
BigInt(5.5); // RangeError
```

Because `BigInt` only supports whole integers.

Example with unsafe number:

```js
let x = 9007199254740993;

console.log(x); // 9007199254740992
```

The number is already imprecise before converting to `BigInt`.

So this can be misleading:

```js
BigInt(9007199254740993); // 9007199254740992n
```

Also, `Number` division and `BigInt` division behave differently:

```js
console.log(5 / 2);   // 2.5
console.log(5n / 2n); // 2n
```

So JavaScript asks you to choose explicitly:

```js
BigInt(5)
```

or:

```js
Number(5n)
```

---

## 2.8 Symbol

`Symbol` creates a unique value.

```js
let id = Symbol("id");
```

Even if two symbols have the same description, they are different.

```js
let a = Symbol("test");
let b = Symbol("test");

console.log(a === b); // false
```

Check type:

```js
typeof Symbol("id"); // "symbol"
```

Symbols are often used as unique object keys.

```js
let userId = Symbol("userId");

let user = {
  name: "Amit",
  [userId]: 101
};

console.log(user[userId]); // 101
```

---

# 3. Reference Data Types

Reference values are objects. They are copied by reference.

Common reference types:

```js
object
array
function
date
map
set
regexp
```

---

## 3.1 Object

Objects store data in key-value pairs.

```js
let user = {
  name: "Amit",
  age: 25,
  isStudent: true
};
```

Access values:

```js
console.log(user.name);   // Amit
console.log(user["age"]); // 25
```

Update value:

```js
user.age = 26;
```

Add property:

```js
user.city = "Mumbai";
```

Delete property:

```js
delete user.isStudent;
```

Check type:

```js
typeof {}; // "object"
```

---

## 3.2 Array

Arrays store multiple values in order.

```js
let numbers = [10, 20, 30];
let names = ["Amit", "Ravi", "Neha"];
```

Access using index:

```js
console.log(numbers[0]); // 10
console.log(names[1]);   // Ravi
```

Check type:

```js
typeof []; // "object"
```

Arrays are special objects.

Correct way to check an array:

```js
Array.isArray([]); // true
```

---

## 3.3 Function

Functions are also objects in JavaScript.

```js
function greet() {
  console.log("Hello");
}
```

Check type:

```js
typeof greet; // "function"
```

Function expression:

```js
const add = function(a, b) {
  return a + b;
};
```

Arrow function:

```js
const multiply = (a, b) => a * b;
```
## 3.4 Date

Used to work with date and time.
```js
let today = new Date();

console.log(today);
console.log(typeof today); // "object"
```
## 3.5 Map

A Map stores key-value pairs. Keys can be of any type.
```js
let map = new Map();

map.set("name", "Amit");
map.set(1, "one");
map.set(true, "yes");

console.log(map.get("name")); // Amit
```
## 3.6 Set

A Set stores unique values.
```js
let set = new Set();

set.add(10);
set.add(20);
set.add(10);

console.log(set); // Set { 10, 20 }
```
Useful for removing duplicates:

```js
let arr = [1, 2, 2, 3, 3, 4];

let unique = [...new Set(arr)];

console.log(unique); // [1, 2, 3, 4]
```

---

# 4. Primitive vs Reference Types

## Primitive values are copied by value

```js
let a = 10;
let b = a;

b = 20;

console.log(a); // 10
console.log(b); // 20
```

Here, `b` gets a separate copy of `a`.

Changing `b` does not affect `a`.

---

## Reference values are copied by reference

```js
let obj1 = {
  name: "Amit"
};

let obj2 = obj1;

obj2.name = "Ravi";

console.log(obj1.name); // Ravi
console.log(obj2.name); // Ravi
```

Here, both variables point to the same object in memory.

Changing one affects the other.

---

# 5. `typeof` Operator

`typeof` is used to check the type of a value.

```js
typeof "hello";       // "string"
typeof 100;           // "number"
typeof true;          // "boolean"
typeof undefined;     // "undefined"
typeof null;          // "object"
typeof 123n;          // "bigint"
typeof Symbol();      // "symbol"
typeof {};            // "object"
typeof [];            // "object"
typeof function() {}; // "function"
```

Important table:

| Value                 | Result        |
| --------------------- | ------------- |
| `typeof "hello"`      | `"string"`    |
| `typeof 10`           | `"number"`    |
| `typeof true`         | `"boolean"`   |
| `typeof undefined`    | `"undefined"` |
| `typeof null`         | `"object"`    |
| `typeof []`           | `"object"`    |
| `typeof {}`           | `"object"`    |
| `typeof function(){}` | `"function"`  |
| `typeof 10n`          | `"bigint"`    |
| `typeof Symbol()`     | `"symbol"`    |

Important points:

```js
typeof null; // "object"
```

This is a JavaScript bug.

```js
typeof []; // "object"
```

Arrays are objects.

Use this for arrays:

```js
Array.isArray([]); // true
```

---

# 6. Dynamic Typing in JavaScript

JavaScript is dynamically typed.

That means a variable can hold different types of values at different times.

```js
let value = 10;
console.log(typeof value); // "number"

value = "hello";
console.log(typeof value); // "string"

value = true;
console.log(typeof value); // "boolean"
```

You do not need to declare the type manually.

```js
let age = 25;
let name = "Amit";
let isStudent = true;
```

---

# 7. Type Conversion vs Type Coercion

There are two types of conversion:

```js
1. Explicit conversion
2. Implicit conversion / type coercion
```

---

# 8. Explicit Type Conversion

Explicit conversion means the developer manually converts one type into another.

---

## 8.1 String to Number

```js
let str = "100";

let num = Number(str);

console.log(num);        // 100
console.log(typeof num); // "number"
```

More examples:

```js
Number("10");      // 10
Number("10.5");    // 10.5
Number("");        // 0
Number("hello");   // NaN
Number(true);      // 1
Number(false);     // 0
Number(null);      // 0
Number(undefined); // NaN
```

---

## 8.2 `parseInt`

`parseInt` converts a value into an integer.

```js
parseInt("100");    // 100
parseInt("100px");  // 100
parseInt("10.5");   // 10
```

Example:

```js
let value = "50px";

console.log(parseInt(value)); // 50
```

---

## 8.3 `parseFloat`

`parseFloat` converts a value into a decimal number.

```js
parseFloat("10.5");    // 10.5
parseFloat("99.99px"); // 99.99
```

---

## 8.4 Number to String

```js
let num = 100;

let str = String(num);

console.log(str);        // "100"
console.log(typeof str); // "string"
```

Another way:

```js
let num = 100;

console.log(num.toString()); // "100"
```

---

## 8.5 Value to Boolean

```js
Boolean(1);         // true
Boolean(0);         // false
Boolean("hello");   // true
Boolean("");        // false
Boolean(null);      // false
Boolean(undefined); // false
Boolean(NaN);       // false
```

---

## 8.6 Number to BigInt

```js
let num = 5;

let big = BigInt(num);

console.log(big);        // 5n
console.log(typeof big); // "bigint"
```

This is explicit conversion.

```js
let a = 10n;
let b = 5;

console.log(a + BigInt(b)); // 15n
```

But this is not allowed:

```js
console.log(a + b); // TypeError
```

Because JavaScript does not automatically mix `Number` and `BigInt`.

---

# 9. Type Coercion

Type coercion means JavaScript automatically converts one type into another.

Example:

```js
console.log("5" + 2); // "52"
```

Here, JavaScript converts `2` into `"2"` and joins the strings.

Another example:

```js
console.log("5" - 2); // 3
```

Here, JavaScript converts `"5"` into number `5`.

---

# 10. Who Decides the Final Type in Type Coercion?

The **operator or context** decides the final type.

JavaScript has predefined rules for each operator and situation.

Example:

```js
"5" + 2
```

The `+` operator sees a string, so it performs string concatenation.

```js
"5" + 2
// "5" + "2"
// "52"
```

Final type:

```js
typeof ("5" + 2); // "string"
```

But:

```js
"5" - 2
```

The `-` operator works with numbers, so JavaScript converts `"5"` to number.

```js
"5" - 2
// 5 - 2
// 3
```

Final type:

```js
typeof ("5" - 2); // "number"
```

---

# 11. Coercion with `+` Operator

The `+` operator can do two things:

```js
1. Number addition
2. String concatenation
```

If one side becomes a string, JavaScript performs string concatenation.

```js
console.log("5" + 2); // "52"
console.log(5 + "2"); // "52"
```

Examples:

```js
console.log(10 + 20);     // 30
console.log("10" + 20);   // "1020"
console.log(10 + "20");   // "1020"
console.log("10" + "20"); // "1020"
console.log(true + "10"); // "true10"
console.log(null + "10"); // "null10"
```

Important:

```js
console.log(1 + 2 + "3"); // "33"
```

Step by step:

```js
1 + 2   // 3
3 + "3" // "33"
```

Another example:

```js
console.log("1" + 2 + 3); // "123"
```

Step by step:

```js
"1" + 2  // "12"
"12" + 3 // "123"
```

---

# 12. Coercion with `-`, `*`, `/`, `%`

These operators usually convert values into numbers.

```js
console.log("10" - 5); // 5
console.log("10" * 2); // 20
console.log("10" / 2); // 5
console.log("10" % 3); // 1
```

Examples:

```js
console.log("5" - "2"); // 3
console.log("5" * "2"); // 10
console.log("5" / "2"); // 2.5
```

Invalid numeric string:

```js
console.log("hello" - 2); // NaN
```

Because:

```js
Number("hello"); // NaN
```

---

# 13. BigInt Coercion Rule

JavaScript does not automatically mix `BigInt` and `Number`.

```js
console.log(10n + 5); // TypeError
```

You must explicitly convert one side.

Convert `Number` to `BigInt`:

```js
console.log(10n + BigInt(5)); // 15n
```

Or convert `BigInt` to `Number`:

```js
console.log(Number(10n) + 5); // 15
```

But be careful when converting big `BigInt` values to `Number`, because precision may be lost.

```js
let big = 900719925474099312345n;

console.log(Number(big)); // may lose precision
```

---

# 14. Truthy and Falsy Values

Truthy/falsy logic is used only when JavaScript needs a boolean.

Examples:

```js
if (value) {}
while (value) {}
!value
Boolean(value)
```

---

## 14.1 Falsy Values

These values behave like `false` in boolean context:

```js
false
0
-0
0n
""
null
undefined
NaN
```

Example:

```js
if ("") {
  console.log("Truthy");
} else {
  console.log("Falsy");
}
```

Output:

```js
Falsy
```

---

## 14.2 Truthy Values

Everything else is truthy.

Examples:

```js
"hello"
"0"
"false"
1
-1
[]
{}
function() {}
```

Important:

```js
Boolean([]);       // true
Boolean({});       // true
Boolean("false");  // true
Boolean("0");      // true
```

---

# 15. How to Remember Empty Object and Empty Array Are Truthy

Think of an empty object as an **empty box**.

```js
let obj = {};
```

The box has nothing inside, but the box itself exists.

So:

```js
Boolean({}); // true
```

Same with an empty array:

```js
let arr = [];
```

The array has no items, but the array itself exists.

So:

```js
Boolean([]); // true
```

Memory line:

```js
Empty container is still a container.
```

Or:

```js
Falsy means absence-like values.
Empty objects and arrays are present, just empty.
```

Examples:

```js
Boolean("");   // false
Boolean(0);    // false
Boolean(null); // false

Boolean({});   // true
Boolean([]);   // true
```

---

# 16. Important Correction: Truthy/Falsy Is Not the Same as `== false`

This is very important.

You may think:

```js
[] == false
```

means:

```js
Is [] falsy?
```

But that is wrong.

This:

```js
Boolean([]); // true
```

and this:

```js
[] == false; // true
```

can both be true because they use **different rules**.

---

# 17. Boolean Context Uses Truthy/Falsy

Example:

```js
if ([]) {
  console.log("Runs");
}
```

Output:

```js
Runs
```

Because:

```js
Boolean([]); // true
```

An empty array is an object, and objects are truthy.

Another example:

```js
if ({}) {
  console.log("Runs");
}
```

Output:

```js
Runs
```

Because:

```js
Boolean({}); // true
```

---

# 18. Loose Equality `==` Does Not Simply Use Truthy/Falsy

This:

```js
[] == false
```

does **not** mean:

```js
Boolean([]) == false
```

If JavaScript did that, it would become:

```js
true == false
```

which would be:

```js
false
```

But JavaScript does not do that.

Instead, `==` uses its own coercion rules.

---

# 19. Why is `[] == false` true?

Step by step:

```js
[] == false
```

First, `false` becomes number:

```js
false -> 0
```

Now:

```js
[] == 0
```

The empty array becomes a primitive value.

An empty array becomes an empty string:

```js
[] -> ""
```

Now:

```js
"" == 0
```

The empty string becomes number:

```js
"" -> 0
```

Now:

```js
0 == 0
```

Result:

```js
true
```

So:

```js
console.log([] == false); // true
```

But:

```js
console.log(Boolean([])); // true
```

Both are correct because they use different rules.

---

# 20. More Examples Showing the Difference

```js
console.log(Boolean([])); // true
console.log([] == false); // true
console.log(![]);         // false
```

Explanation:

```js
Boolean([]); // true because arrays are objects
![];         // false because [] is truthy
[] == false; // true because of loose equality coercion
```

Another example:

```js
console.log([] == true); // false
```

Step by step:

```js
[] == true
[] == 1
"" == 1
0 == 1
false
```

This proves:

```js
x == false
```

does not mean:

```js
x is falsy
```

---

# 21. Do Not Use `== false` to Check Falsy Values

Bad:

```js
if (value == false) {
  console.log("Falsy");
}
```

This can give confusing results.

Better:

```js
if (!value) {
  console.log("Falsy");
}
```

But for arrays, even this will not check emptiness:

```js
let arr = [];

if (!arr) {
  console.log("Array is falsy");
} else {
  console.log("Array is truthy");
}
```

Output:

```js
Array is truthy
```

To check empty array:

```js
let arr = [];

if (arr.length === 0) {
  console.log("Array is empty");
}
```

To check empty object:

```js
let obj = {};

if (Object.keys(obj).length === 0) {
  console.log("Object is empty");
}
```

---

# 22. Equality Operators

JavaScript has two main equality operators:

```js
==   loose equality
===  strict equality
```

---

## 22.1 Loose Equality `==`

`==` compares values after type coercion.

```js
console.log(5 == "5"); // true
```

JavaScript converts `"5"` into number `5`.

```js
5 == "5"
// 5 == 5
// true
```

More examples:

```js
console.log(0 == false);        // true
console.log(1 == true);         // true
console.log(null == undefined); // true
console.log("" == false);       // true
console.log([] == false);       // true
```

But remember:

```js
[] == false
```

does **not** mean `[]` is falsy.

`[]` is truthy.

---

## 22.2 Strict Equality `===`

`===` compares both value and type.

No type coercion happens.

```js
console.log(5 === "5"); // false
```

Because:

```js
5   // number
"5" // string
```

More examples:

```js
console.log(0 === false);        // false
console.log(1 === true);         // false
console.log(null === undefined); // false
console.log("" === false);       // false
console.log([] === false);       // false
```

Best practice:

```js
Use === most of the time.
```

---

# 23. Object-to-Primitive Conversion

When objects are used in certain operations, JavaScript may convert them to primitive values.

Example:

```js
console.log([] + []); // ""
```

Why?

```js
[] becomes ""
[] becomes ""
"" + "" becomes ""
```

Example:

```js
console.log([] + {}); // "[object Object]"
```

Why?

```js
[] becomes ""
{} becomes "[object Object]"
"" + "[object Object]" becomes "[object Object]"
```

Array examples:

```js
String([]);        // ""
String([1, 2, 3]); // "1,2,3"
```

Object example:

```js
String({}); // "[object Object]"
```

This is why some loose equality examples look strange.

---

# 24. Common Coercion Examples

| Expression           |  Result | Explanation                    |
| -------------------- | ------: | ------------------------------ |
| `"5" + 2`            |  `"52"` | `2` becomes string             |
| `"5" - 2`            |     `3` | `"5"` becomes number           |
| `"5" * "2"`          |    `10` | Both become numbers            |
| `"10" / 2`           |     `5` | `"10"` becomes number          |
| `true + 1`           |     `2` | `true` becomes `1`             |
| `false + 1`          |     `1` | `false` becomes `0`            |
| `null + 1`           |     `1` | `null` becomes `0`             |
| `undefined + 1`      |   `NaN` | `undefined` becomes `NaN`      |
| `"hello" - 1`        |   `NaN` | `"hello"` cannot become number |
| `5 == "5"`           |  `true` | `"5"` becomes number           |
| `5 === "5"`          | `false` | No coercion                    |
| `0 == false`         |  `true` | `false` becomes `0`            |
| `0 === false`        | `false` | Different types                |
| `null == undefined`  |  `true` | Special loose equality rule    |
| `null === undefined` | `false` | Different types                |
| `Boolean([])`        |  `true` | Array object exists            |
| `[] == false`        |  `true` | Loose equality coercion        |
| `![]`                | `false` | `[]` is truthy                 |
| `Boolean({})`        |  `true` | Object exists                  |

---

# 25. Important Conversion Rules

## String conversion

```js
String(123);       // "123"
String(true);      // "true"
String(false);     // "false"
String(null);      // "null"
String(undefined); // "undefined"
String([]);        // ""
String({});        // "[object Object]"
```

---

## Number conversion

```js
Number("123");     // 123
Number("");        // 0
Number(" ");       // 0
Number("abc");     // NaN
Number(true);      // 1
Number(false);     // 0
Number(null);      // 0
Number(undefined); // NaN
Number([]);        // 0
Number([5]);       // 5
Number([1, 2]);    // NaN
```

---

## Boolean conversion

```js
Boolean(0);         // false
Boolean("");        // false
Boolean(null);      // false
Boolean(undefined); // false
Boolean(NaN);       // false
Boolean(false);     // false

Boolean(1);         // true
Boolean("hello");   // true
Boolean("false");   // true
Boolean("0");       // true
Boolean([]);        // true
Boolean({});        // true
```

---

# 26. Special Cases to Remember

## Case 1

```js
console.log(typeof null); // "object"
```

`null` is not actually an object. This is a historical bug.

---

## Case 2

```js
console.log(typeof []); // "object"
```

Arrays are objects.

Use:

```js
Array.isArray([]); // true
```

---

## Case 3

```js
console.log(Boolean([])); // true
```

Empty array is truthy because it is an object.

---

## Case 4

```js
console.log([] == false); // true
```

This is because of loose equality coercion:

```js
[] -> ""
false -> 0
"" -> 0
0 == 0
```

---

## Case 5

```js
console.log(Boolean({})); // true
```

Empty object is truthy because it exists.

---

## Case 6

```js
console.log({} == false); // false
```

Object does not become `0` like an empty array does.

Roughly:

```js
{} -> "[object Object]"
Number("[object Object]") -> NaN
NaN == 0 -> false
```

---

## Case 7

```js
console.log([] + []); // ""
```

Both arrays become empty strings.

---

## Case 8

```js
console.log([] + {}); // "[object Object]"
```

The empty array becomes:

```js
""
```

The object becomes:

```js
"[object Object]"
```

So:

```js
"" + "[object Object]"
```

Result:

```js
"[object Object]"
```

---

# 27. Best Practices

Use strict equality:

```js
=== 
```

instead of:

```js
==
```

Use explicit conversion when needed:

```js
Number(value)
String(value)
Boolean(value)
BigInt(value)
```

Do not check falsiness like this:

```js
value == false
```

Use this:

```js
!value
```

Check empty array like this:

```js
arr.length === 0
```

Check empty object like this:

```js
Object.keys(obj).length === 0
```

Check arrays like this:

```js
Array.isArray(value)
```

---

# 28. Interview-Friendly Summary

JavaScript has **7 primitive data types**:

```js
string, number, boolean, undefined, null, bigint, symbol
```

Reference types include:

```js
object, array, function, date, map, set
```

Primitive values are copied by value. Reference values are copied by reference.

JavaScript is dynamically typed, so the same variable can store different types at different times.

Type coercion means JavaScript automatically converts types based on the operator or context.

Example:

```js
"5" + 2 // "52"
```

Here, `+` performs string concatenation.

```js
"5" - 2 // 3
```

Here, `-` performs numeric subtraction.

Truthy/falsy logic applies only when JavaScript needs a boolean, such as in `if`, `while`, `!`, or `Boolean()`.

Important difference:

```js
Boolean([]); // true
[] == false; // true
```

`[]` is truthy, but `[] == false` is true because `==` uses special coercion rules, not simple truthy/falsy logic.

Use `===` instead of `==` to avoid confusing coercion.

---

# 29. Quick Revision Sheet

## Data Types

```js
Primitive:
string, number, boolean, undefined, null, bigint, symbol

Reference:
object, array, function, date, map, set
```

## Type Checking

```js
typeof "hello"       // "string"
typeof 10            // "number"
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof null          // "object"
typeof []            // "object"
typeof {}            // "object"
typeof function(){}  // "function"
Array.isArray([])    // true
```

## Falsy Values

```js
false
0
-0
0n
""
null
undefined
NaN
```

## Truthy Examples

```js
"hello"
"0"
"false"
[]
{}
function() {}
```

## Coercion Rules

```js
"5" + 2        // "52"
"5" - 2        // 3
true + 1       // 2
false + 1      // 1
null + 1       // 1
undefined + 1  // NaN
```

## BigInt

```js
10n + 5              // TypeError
10n + BigInt(5)      // 15n
Number(10n) + 5      // 15
```

## Truthy/Falsy vs `==`

```js
Boolean([])  // true
![]          // false
[] == false  // true
```

Reason:

```js
[] == false
[] == 0
"" == 0
0 == 0
true
```

## Equality

```js
5 == "5"     // true
5 === "5"    // false

0 == false   // true
0 === false  // false

[] == false  // true
[] === false // false
```

Best rule:

```js
Use === most of the time.
Do not use value == false to check falsiness.
```
