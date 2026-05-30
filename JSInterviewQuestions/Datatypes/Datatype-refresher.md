# JavaScript Notes: Data Types and Type Coercion

## 1. Data Types in JavaScript

JavaScript data types are divided into two main categories:

```js
1. Primitive data types
2. Non-primitive / Reference data types
```

---

# 2. Primitive Data Types

Primitive values are simple values. They are stored and copied by value.

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

A string is used to store text.

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

JavaScript has only one main number type for integers and decimals.

```js
let age = 25;
let price = 99.99;
let temperature = -10;
```

Check type:

```js
typeof 100;   // "number"
typeof 10.5;  // "number"
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

`NaN` means **Not a Number**, but its type is still `"number"`.

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

Example:

```js
let username;

console.log(username); // undefined
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

It means the developer has intentionally assigned “no value”.

Example:

```js
let selectedProduct = null;
```

Important interview point:

```js
typeof null; // "object"
```

This is a historical bug in JavaScript.

Difference:

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

// console.log(a + b); // Error
```

Correct way:

```js
console.log(a + BigInt(b)); // 15n
```

---

## 2.7 Symbol

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

# 3. Non-Primitive / Reference Data Types

Non-primitive values are objects. They are stored and copied by reference.

Examples:

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
console.log(user.name);     // Amit
console.log(user["age"]);   // 25
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

Correct way to check array:

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

---

## 3.4 Date

Used to work with date and time.

```js
let today = new Date();

console.log(today);
console.log(typeof today); // "object"
```

---

## 3.5 Map

A `Map` stores key-value pairs. Keys can be of any type.

```js
let map = new Map();

map.set("name", "Amit");
map.set(1, "one");
map.set(true, "yes");

console.log(map.get("name")); // Amit
```

---

## 3.6 Set

A `Set` stores unique values.

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

Here, `b` gets a copy of `a`.

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

Correct array check:

```js
Array.isArray([]); // true
```

---

# 6. Dynamic Typing in JavaScript

JavaScript is a dynamically typed language.

That means a variable can hold different types of values.

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

# 7. Type Conversion

Type conversion means changing one data type into another.

There are two types:

```js
1. Explicit conversion
2. Implicit conversion / Type coercion
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

Other examples:

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

If one value is a string, JavaScript usually converts the other value into a string.

```js
console.log("5" + 2); // "52"
console.log(5 + "2"); // "52"
```

Examples:

```js
console.log(10 + 20);       // 30
console.log("10" + 20);     // "1020"
console.log(10 + "20");     // "1020"
console.log("10" + "20");   // "1020"
console.log(true + "10");   // "true10"
console.log(null + "10");   // "null10"
```

Important:

```js
console.log(1 + 2 + "3"); // "33"
```

Step by step:

```js
1 + 2      // 3
3 + "3"    // "33"
```

Another example:

```js
console.log("1" + 2 + 3); // "123"
```

Step by step:

```js
"1" + 2    // "12"
"12" + 3   // "123"
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

# 13. Boolean Coercion

Boolean coercion happens in places like:

```js
if
while
for
!
&&
||
```

Example:

```js
if ("hello") {
  console.log("Runs");
}
```

Because:

```js
Boolean("hello"); // true
```

Another example:

```js
if (0) {
  console.log("Runs");
} else {
  console.log("Does not run");
}
```

Because:

```js
Boolean(0); // false
```

---

# 14. Truthy and Falsy Values

## Falsy Values

These values behave like `false`:

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

## Truthy Values

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

Important examples:

```js
Boolean([]);       // true
Boolean({});       // true
Boolean("false");  // true
Boolean("0");      // true
```

Even empty arrays and empty objects are truthy.

---

# 15. Coercion with Equality Operators

JavaScript has two main equality operators:

```js
==   loose equality
===  strict equality
```

---

## 15.1 Loose Equality `==`

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
console.log(0 == false);      // true
console.log(1 == true);       // true
console.log(null == undefined); // true
console.log("" == false);     // true
```

---

## 15.2 Strict Equality `===`

`===` compares both value and type.

No type coercion happens.

```js
console.log(5 === "5"); // false
```

Because:

```js
5       // number
"5"     // string
```

More examples:

```js
console.log(0 === false);        // false
console.log(1 === true);         // false
console.log(null === undefined); // false
console.log("" === false);       // false
```

Best practice:

```js
Use === most of the time.
```

---

# 16. Common Coercion Examples

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

---

# 17. Important Conversion Rules

## String conversion

```js
String(123);       // "123"
String(true);      // "true"
String(false);     // "false"
String(null);      // "null"
String(undefined); // "undefined"
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
```

---

## Boolean conversion

```js
Boolean(0);         // false
Boolean("");        // false
Boolean(null);      // false
Boolean(undefined); // false
Boolean(NaN);       // false

Boolean(1);         // true
Boolean("hello");   // true
Boolean([]);        // true
Boolean({});        // true
```

---

# 18. Special Cases to Remember

## Case 1

```js
console.log(typeof null); // "object"
```

`null` is not actually an object. This is a historical JavaScript bug.

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
console.log([] == false); // true
```

Why?

```js
[] becomes ""
"" becomes 0
false becomes 0
0 == 0
```

---

## Case 4

```js
console.log([] + []); // ""
```

Both arrays become empty strings.

---

## Case 5

```js
console.log([] + {}); // "[object Object]"
```

The empty array becomes `""`.

The object becomes `"[object Object]"`.

So:

```js
"" + "[object Object]"
```

Result:

```js
"[object Object]"
```

---

## Case 6

```js
console.log({} + []);
```

This can behave differently depending on context because `{}` may be treated as a block in some cases.

In normal expression form:

```js
console.log({} + []); // "[object Object]"
```

---

# 19. Interview-Friendly Summary

JavaScript has two categories of data types: **primitive** and **reference**.

Primitive types are:

```js
string, number, boolean, undefined, null, bigint, symbol
```

Reference types include:

```js
object, array, function, date, map, set
```

Primitive values are copied by value, while reference values are copied by reference.

JavaScript is dynamically typed, so a variable can store different types at different times.

Type coercion means JavaScript automatically converts one type into another based on the operator or context.

For example:

```js
"5" + 2 // "52"
```

Here, `+` performs string concatenation.

```js
"5" - 2 // 3
```

Here, `-` performs numeric subtraction.

Use `===` instead of `==` to avoid unexpected type coercion.

---

# 20. Quick Revision Sheet

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

## Coercion Rules

```js
"5" + 2     // "52"
"5" - 2     // 3
true + 1    // 2
false + 1   // 1
null + 1    // 1
undefined + 1 // NaN
```

## Equality

```js
5 == "5"    // true
5 === "5"   // false

0 == false  // true
0 === false // false
```

## Best Practice

```js
Use === instead of ==
Use Array.isArray() to check arrays
Remember typeof null returns "object"
Remember objects and arrays are reference types
```
