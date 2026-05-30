https://www.freecodecamp.org/news/javascript-settimeout-how-to-set-a-timer-in-javascript-or-sleep-for-n-seconds/

# Consolidated notes: closures, `var`, `let`, loops, and bindings

## 1. What is a closure?

A **closure** is a function that remembers variables from the scope where it was created.

Example:

```js
function outer() {
  let counter = 0;

  function incrementCounter() {
    counter++;
    console.log(counter);
  }

  return incrementCounter;
}

const myNewFunction = outer();

myNewFunction(); // 1
myNewFunction(); // 2
```

`incrementCounter` still has access to `counter` even after `outer()` has finished executing. That remembered access is called a **closure**.

---

## 2. Each call to a function creates a new lexical environment

This is why this works the way it does:

```js
function outer() {
  let counter = 0;

  function incrementCounter() {
    counter++;
    console.log(counter);
  }

  return incrementCounter;
}

const myNewFunction = outer();

myNewFunction(); // 1
myNewFunction(); // 2

const anotherFunction = outer();

anotherFunction(); // 1
anotherFunction(); // 2
```

`anotherFunction()` does **not** print `3`.

Why?

Because this call:

```js
const myNewFunction = outer();
```

creates one lexical environment:

```txt
Environment A:
counter = 0
```

And this call:

```js
const anotherFunction = outer();
```

creates a different lexical environment:

```txt
Environment B:
counter = 0
```

So:

```txt
myNewFunction closes over Environment A
anotherFunction closes over Environment B
```

They do not share the same `counter`.

---

## 3. Closures capture bindings, not frozen values

This is the most important idea.

A closure does **not usually capture a snapshot of the value**.

It captures a **binding**.

A binding is the connection between a variable name and the variable slot/value in a scope.

Think of it like this:

```txt
name "i" ---> variable binding/slot ---> current value
```

So when you write:

```js
let i = 0;
```

JavaScript creates a binding for the name `i`.

When you later do:

```js
i = 1;
```

you are updating the value stored in that same binding.

---

## 4. What does “binding” mean?

A **binding** is not exactly the same as a variable name, and it is not necessarily a literal physical memory address.

It is a language-level concept.

Example:

```js
let x = 10;
```

Conceptually:

```txt
identifier: x
binding: mutable let binding
current value: 10
```

Then:

```js
x = 20;
```

Now:

```txt
identifier: x
same binding
current value: 20
```

So “binding” means:

> The relationship between a name and the value/storage it refers to inside a particular scope.

---

## 5. `var` in loops: one shared binding

Example:

```js
var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = function() {
    console.log("My value: " + i);
  };
}

for (var j = 0; j < 3; j++) {
  funcs[j]();
}
```

Output:

```txt
My value: 3
My value: 3
My value: 3
```

Why?

Because `var` is function-scoped, not block-scoped.

So this loop:

```js
for (var i = 0; i < 3; i++) {
  funcs[i] = function() {
    console.log(i);
  };
}
```

has only **one shared `i` binding**.

Conceptually:

```js
var i;

i = 0;
funcs[0] = function() {
  console.log(i);
};

i = 1;
funcs[1] = function() {
  console.log(i);
};

i = 2;
funcs[2] = function() {
  console.log(i);
};

i = 3;
```

All three functions point to the same `i`.

After the loop finishes, `i` is `3`.

So all functions print:

```txt
3
3
3
```

---

## 6. `let` in loop header: new binding per iteration

Example:

```js
var funcs = [];

for (let i = 0; i < 3; i++) {
  funcs[i] = function() {
    console.log("My value: " + i);
  };
}

for (var j = 0; j < 3; j++) {
  funcs[j]();
}
```

Output:

```txt
My value: 0
My value: 1
My value: 2
```

Why?

Because `let` declared in the loop header creates a **fresh binding for each iteration**.

This:

```js
for (let i = 0; i < 3; i++) {
  funcs[i] = function() {
    console.log(i);
  };
}
```

acts conceptually like this:

```js
{
  let i = 0;
  funcs[0] = function() {
    console.log(i);
  };
}

{
  let i = 1;
  funcs[1] = function() {
    console.log(i);
  };
}

{
  let i = 2;
  funcs[2] = function() {
    console.log(i);
  };
}
```

So each function closes over a different `i`.

---

## 7. Important nuance: `let` only behaves this way when declared in the loop header

This gives:

```js
let arr = [];

for (let i = 0; i < 3; i++) {
  arr.push(() => i);
}

console.log(arr.map(fn => fn()));
```

Output:

```js
[0, 1, 2]
```

Because `i` is declared here:

```js
for (let i = 0; i < 3; i++)
```

So JavaScript creates a fresh `i` binding per iteration.

But this is different:

```js
let arr = [];
let i;

for (i = 0; i < 3; i++) {
  arr.push(() => i);
}

console.log(arr.map(fn => fn()));
```

Output:

```js
[3, 3, 3]
```

Why?

Because now `i` was declared outside the loop:

```js
let i;
```

There is only one shared `i`.

The loop updates that same `i` repeatedly.

So all closures see the final value: `3`.

---

## 8. `setTimeout` has the same closure issue

Example with `var`:

```js
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
```

Output:

```txt
3
3
3
```

Why?

The loop finishes before the callbacks run.

By the time `setTimeout` executes the functions, the shared `var i` has become `3`.

Example with `let`:

```js
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
```

Output:

```txt
0
1
2
```

Because each callback closes over a different per-iteration `i`.

---

## 9. `setTimeout` outside the loop

With `var`:

```js
for (var i = 0; i < 3; i++) {}

setTimeout(() => {
  console.log(i);
}, 1000);
```

Output:

```txt
3
```

Because `var i` is function-scoped/global-scoped and still exists outside the loop.

With `let` in the loop header:

```js
for (let i = 0; i < 3; i++) {}

setTimeout(() => {
  console.log(i);
}, 1000);
```

Output:

```txt
ReferenceError: i is not defined
```

Because `let i` exists only inside the loop.

With `let` outside:

```js
let i;

for (i = 0; i < 3; i++) {}

setTimeout(() => {
  console.log(i);
}, 1000);
```

Output:

```txt
3
```

Because there is one outer `i`.

---

## 10. Factory function solution

Example:

```js
var myFunctions = [];

function createMyFunction(i) {
  return function() {
    console.log("My value: " + i);
  };
}

for (var i = 0; i < 3; i++) {
  myFunctions[i] = createMyFunction(i);
}

for (var j = 0; j < 3; j++) {
  myFunctions[j]();
}
```

Output:

```txt
My value: 0
My value: 1
My value: 2
```

Why?

Each call to `createMyFunction(i)` creates a new local parameter binding.

This call:

```js
createMyFunction(0);
```

creates:

```txt
Environment A:
i = 0
```

This call:

```js
createMyFunction(1);
```

creates:

```txt
Environment B:
i = 1
```

This call:

```js
createMyFunction(2);
```

creates:

```txt
Environment C:
i = 2
```

So each returned function closes over a different `i`.

Better explanation:

> Passing `i` as a parameter creates a new local parameter binding for each function call.

Less accurate explanation:

> The function makes a copy of the variable.

That explanation is okay informally for primitives, but it can become confusing with objects.

---

## 11. Arrow functions do not change closure behavior

This:

```js
arr.push(() => i);
```

and this:

```js
arr.push(function() {
  return i;
});
```

both close over `i`.

Arrow functions are different mainly in how they handle `this`, `arguments`, and a few other details.

But for this closure-loop issue, arrow functions and regular functions behave the same.

Example:

```js
let arr = [];

for (var i = 0; i < 3; i++) {
  arr.push(() => i);
}

console.log(arr.map(fn => fn()));
```

Output:

```js
[3, 3, 3]
```

Same as with regular functions.

---

## 12. `var` versus `let` summary

### `var`

```js
for (var i = 0; i < 3; i++) {
  funcs.push(() => i);
}
```

One shared binding:

```txt
i: 0 -> 1 -> 2 -> 3
```

All functions point to the same binding.

Output:

```js
[3, 3, 3]
```

### `let`

```js
for (let i = 0; i < 3; i++) {
  funcs.push(() => i);
}
```

Separate binding per iteration:

```txt
iteration 0: i = 0
iteration 1: i = 1
iteration 2: i = 2
```

Each function points to a different binding.

Output:

```js
[0, 1, 2]
```

---

## 13. What about memory efficiency?

When we say:

> `let` creates a new binding per iteration

we are describing the **behavior required by the language**.

It does not necessarily mean the JavaScript engine wastefully allocates a large new memory object every time.

This is the distinction:

```txt
Language semantics:
  The program must behave as if each iteration has a separate i.

Engine implementation:
  The engine may optimize memory internally as long as behavior remains correct.
```

Example:

```js
let sum = 0;

for (let i = 0; i < 1_000_000; i++) {
  sum += i;
}
```

Here, no closure stores `i` for later.

So the engine can optimize heavily.

But here:

```js
const arr = [];

for (let i = 0; i < 1_000_000; i++) {
  arr.push(() => i);
}
```

Now every function must remember a different `i`.

So the engine has to preserve enough information for that behavior.

This is not wasteful; it is required by what the code asks for.

---

## 14. What does “semantic rule first” mean?

It means:

> The language defines how the code must behave, not exactly how the engine must store it in memory.

For example:

```js
for (let i = 0; i < 3; i++) {
  arr.push(() => i);
}
```

JavaScript requires this behavior:

```js
[0, 1, 2]
```

That is the semantic rule.

Internally, the JavaScript engine can use whatever optimized memory representation it wants, as long as the observable output is correct.

So:

```txt
Conceptually:
  new binding per iteration

Physically:
  optimized by the engine when possible
```

---

## 15. `const` in loops

This is invalid:

```js
for (const i = 0; i < 3; i++) {
  console.log(i);
}
```

Because `i++` tries to reassign a `const`.

But this is valid:

```js
for (const value of [0, 1, 2]) {
  console.log(value);
}
```

And closures work nicely here:

```js
let arr = [];

for (const value of [0, 1, 2]) {
  arr.push(() => value);
}

console.log(arr.map(fn => fn()));
```

Output:

```js
[0, 1, 2]
```

In `for...of`, each iteration gets a fresh `value`.

---

## 16. Is this behavior found in other languages?

Yes, some languages have similar per-iteration binding behavior.

For example, modern C# `foreach` behaves similarly:

```csharp
var actions = new List<Action>();

foreach (var value in new[] { 0, 1, 2 })
{
    actions.Add(() => Console.WriteLine(value));
}

foreach (var action in actions)
{
    action();
}
```

Modern C# prints:

```txt
0
1
2
```

Go also moved toward per-iteration loop variables in newer versions to avoid common closure bugs.

But not every language does this.

Python, for example, has the late-binding closure behavior:

```py
funcs = []

for i in range(3):
    funcs.append(lambda: i)

print([fn() for fn in funcs])
```

Output:

```py
[2, 2, 2]
```

Python workaround:

```py
funcs = []

for i in range(3):
    funcs.append(lambda i=i: i)

print([fn() for fn in funcs])
```

Output:

```py
[0, 1, 2]
```

So this behavior is language-specific.

---

# Final cheat sheet

| Code pattern                                              |              Output | Reason                                                 |
| --------------------------------------------------------- | ------------------: | ------------------------------------------------------ |
| `for (var i = 0; i < 3; i++) { funcs.push(() => i); }`    |         `[3, 3, 3]` | One shared `i` binding                                 |
| `for (let i = 0; i < 3; i++) { funcs.push(() => i); }`    |         `[0, 1, 2]` | Fresh `i` binding per iteration                        |
| `let i; for (i = 0; i < 3; i++) { funcs.push(() => i); }` |         `[3, 3, 3]` | One outer shared `i`                                   |
| `createFunction(i)` inside `var` loop                     |         `[0, 1, 2]` | Each function call creates a new parameter binding     |
| `setTimeout` with `var` loop                              |           `3, 3, 3` | Callback runs after loop; shared `i` is now `3`        |
| `setTimeout` with `let` loop                              |           `0, 1, 2` | Each callback gets its own loop `i`                    |
| `for (const x of array)` with closures                    | Captures each value | Fresh binding per iteration                            |
| Arrow function vs regular function                        |   Same for closures | Arrow functions do not change closure capture behavior |

Main takeaway:

> Closures capture bindings.
> `var` loops usually give all closures the same binding.
> `let` in a `for` loop header gives each iteration a fresh binding.

/*********************************************** AMBIGUOUS BEHAVIOUR OF CLOSURES IN A LOOP **********************************************************************/
### Predict the output:
```
/*1.Predict the output:   */ 
  var funcs = [];
  // let's create 3 functions
 for (var i = 0; i < 3; i++) {
  // and store them in funcs
  funcs[i] = function() {
    // each should log its value.
      console.log("My value: " + i);
  };
}
for (var j = 0; j < 3; j++) {
 // and now let's run each one to see
 funcs[j]();
}

/*Output:
a.My value: 3   b.My value: 0    c.Reference Error  d.My value:undefined
  My value: 3     My value: 1                        My value:undefined
  My value: 3     My value: 2                        My value:undefined

ans-a
*/
```
EXPLANATION:because Funcs() is bound to outer-scope variable i which is changed in each loop so after loop completes it has value  3 (var declaration), that is the reason it is printing 3 each time.   

```
 /*2.Predict the output:*/
function createMyFunction(i) {
  return function() {
     console.log("My value: " + i);
     };
}

for (var i = 0; i < 3; i++) {
myFunctions[i] = createMyFunction(i);
}
for (var j = 0; j < 3; j++) {
  myFunctions[j](); 
}
/*                                                                                     
|a. My value: 3    b.My value: 0     c.Reference Error d. My value:undefined
|   My value: 3      My value: 1                          My value:undefined
|   My value: 3      My value: 2                          My value:undefined
                                                                                       
|ans-b
*/                                                                                        
 EXPLANATION:We passed variable i as a parameter, instead of using it directly.As we know if we pass a parameter function makes its own local copy of the variable
     |(if it is not object type which pass by reference).So each time function has its own local copy of variable which is updated by loop iteration*/
                                                                                       
/*______________________________________________________________________________________________________________________________________________________________________*/

/*3.  Predict the output*/                                                             |  /*4.Predict the output */
                                                                                       |  let arr = [];
   for (let i = 0; i < 3; i++) {                                                       |   for (let i=0; i < 3; i++) {
     funcs[i] = function() {                                                           |      arr.push(() => i);
      console.log("My value: " + i);                                                   |    }
    };                                                                                 |  console.log(arr.map(x => x())); // [0,1,2]
  }                                                                                    |   
   for (var j = 0; j < 3; j++) {                                                       | /*EXPLANATION:In loops, you get a fresh binding for each iteration 
      funcs[j]();                                                                      |               if you let-declare a variable.
   }                                                                                   |
                                                                                       |
  /* a.My value:3    b.My value: 0  c.Reference Error  d.My value:undefined            |/*5.Predict the output */
 /*    My value:3      My value: 1                       My value:undefined  */        |   let arr = [];
 /*    My value:3      My value: 2                       My value:undefined  */        |    for (var i=0; i < 3; i++) {
                                                                                       |      arr.push(() => i);
 /*ans-b                                                                               |    }
 EXPLANATION :  ECMAScript 6 (ES6) introduces new let and const keywords */            |  console.log(arr.map(x => x())); // [3,3,3]
             /* that are scoped differently than var-based variables.                  | EXPLANATION : a var declaration leads to a single binding for the
                For example, in a loop with a let-based index, each iteration          |         whole loop (a const declaration works the same):
                through the loop will have a new variable i with loop scope i.e ,      |
                new lexical environment for each iteration  within the execution       |
                context of the for loop.  |
                                                                                       |
     ********   In loops, you get a fresh binding for each iteration if you            |
                let-declare a variable. The loops that allow you to do so are: for,    |
                for-in and for-of.*/                                                   |
                  
/*____________________________________________________________________________________________________________________________________________________________*/              
                                                                                           
/* 6.Predict the output */                                                             | /* 7. Predict the output */
   var array = [1, 2, 3, 4, 5]                                                         |   var array = [1, 2, 3, 4, 5]
   for(var i = 0; i < array.length; i++) {                                             |     for(let i = 0; i < array.length; i++) {
    setTimeout(() => {                                                                 |          setTimeout(() => {
    console.log(array[i])                                                              |              console.log(array[i])
  }, 1000);                                                                            |             }, 1000);
}                                                                                      |      }
/* a.1 2 3 4 5  b.undefined undefined undefined undefined undefined                    |
ans- b                                                                                 |  a. 1 2 3 4 5
EXPLANATION: as the timer for setTimeout finishes,i is 5 and its value is available    |  b. undefined undefined undefined undefined undefined
outside the loop as i is declared as a var.                                            |  c. error
Now array[5] is undefined ,hence the output                                            | ans -a
                                                                                       | EXPLANATION:In a loop with a let-based index,each iteration through the
                                                                                       |             loop will have a new variable i with loop scope.Also
                                                                                       |      as inner arrow function is enclosed in setTimeout
                                                                                       |         ,it has access to i's even when
                                                                                       |              called later
                                                                                       |
                                                                                       
 /*_______________________________________________________________________________________________*/              
               
    /*8.Predict the output */                                                           |
    var array = [1, 2, 3, 4, 5]                                                         |      var array = [1, 2, 3, 4, 5]   
for(var i = 0; i < array.length; i++) {                                                 |     for(let i = 0; i < array.length; i++) {  
  setTimeout(() => {                                                                    |          setTimeout(() => {                                                   
    console.log(array[i])                                                               |           console.log(array[i])    
  }, 0);                                                                                |          }, 0); 
}                                                                                       |       }
     //Output:undefined undefined undefined undefined undefined                         |  //Output: 1 2 3 4 5
             
