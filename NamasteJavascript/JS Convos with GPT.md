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
