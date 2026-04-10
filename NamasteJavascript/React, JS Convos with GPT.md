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

# REACT Questions:

## 1. What is Batching?

- Batching means React groups multiple state updates into a single render.

- **With batching: one single render. This improves performance significantly.**

4️⃣ Example of Batching
```
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  return <button onClick={handleClick}>{count}</button>;
}
```
```
When clicked:
Expected:
3
```
```
Actual: 1
```

**- Because React batches updates and each update uses the same stale value.**

## 2. What are functional updates in React? 
- Useful for sequential updation, overriding the asynchronous state updations in React.
- Functional Update Fix
- To avoid stale values, Now React processes them sequentially.
- The functional state update form is used when the **new state depends on the previous state**.
- Since **React batches updates asynchronously, using setState(prev => prev + 1) ensures that the update always uses the latest state value and avoids stale state issues.***
  
```
setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```
```
Result:
3
```
## 3. What will this print?

```
const [count, setCount] = useState(0);

useEffect(() => {
  setCount(count + 1);
  console.log(count);
}, []);
```

**It will print 0 (not 1). Because React does not immediately updates the state, instead, it schedules the update.** 
1. UI renders and commit phase is done.
2. Then useeffect callback is triggered. It has state manipulation, which schedules the state updation by queuing it into the update queue.
     - creates an update
     - adds it to the update queue
     - marks component for re-render
3. Synchronous code continues. Since count has not yet been updated, it gives 0 as console.log.
4. After the useeffect is finished, React processes the update queue. Now it re-renders the component and now te count = 1;

## 4. What will happen now?
```
const [count, setCount] = useState(0);
useEffect(() => {
  setCount(count + 1);
  setCount(count + 1);
}, []);
```
1. Initially, UI is rendered.
2. useEffect's callback is executed. The back to back state updations are **batched in React** ie. grouped together. So count in both case is 0 only.
     - creates one update --> adds to queue
     - creates another update --> adds it to queue. but both have count+1  = 0+1 = 1. Hence, second update still uses the stale state.
```
Update Queue
-------------
setCount(1)
setCount(1)
```
3. After useEffect is finished, react processes the update queue. **It processes both the renders in the same render cycle.**
  - **Processes the batch updates(first updates to 1, second also updates to 1, so no change for this second update) --> calculates the final state(count = 1) ---> only then does the re-render once**

**VISUAL TIMELINE:**
```
Initial Render
count = 0
      ↓
useEffect runs
      ↓
Queue updates
[ setCount(1), setCount(1) ]
      ↓
React processes queue
      ↓
New state = 1
      ↓
Single re-render
```

## 5. What happens here? When updations are in separate event loops?
```
setCount(1);

setTimeout(() => {
  setCount(2);
}, 0);
```


1. Step1: React Creates an update. Pushes it into the update queue. Schedules a re-render. (No immediate updation of the state).
2. Step2: setTimeout is scheduled in the macrotask queue fo js event loop
3. Step3: React processes the update. Updates the value of count to 1. Re-renders the component. (Now count = 1)
4. Step4: Event loop executes the setTimeout after 0 ms delay. React creates another update(setCount(2)) --> pushes into update queue --> Schedules a re-render
5. React now processes the second update and re-renders the component with count = 2 this time.
VISUAL TIMELINE:
```
Initial render
count = 0
      ↓
setCount(1)
      ↓
Render #1
count = 1
      ↓
setTimeout executes
      ↓
setCount(2)
      ↓
Render #2
count = 2
```

**Why This Is Different From Earlier Example**
- Earlier, **Both updates happened in the same synchronous execution, so React batched them.**

```
setCount(count + 1);
setCount(count + 1);
```

- But here,
**They occur in different event loop cycles, so React processes them separately.**
```
setCount(1) → synchronous task
setCount(2) → macrotask (later)
```

# CSS questions:

## What is Margin Collapse?

- Margin collapse happens when vertical margins of two elements combine instead of adding up.

```
<div class="box1"></div>
<div class="box2"></div>
```
```
.box1 {
  margin-bottom: 40px;
}

.box2 {
  margin-top: 20px;
}
```

- Expected spacing:
40px + 20px = 60px

- Actual spacing:
40px

**Because margins collapse into the larger one.**
