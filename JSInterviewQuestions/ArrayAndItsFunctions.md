# JavaScript Array Methods: `slice` vs `splice`, `join` vs `concat` vs `push` vs `unshift`

The easiest way to remember these methods is to ask two questions:

```js
1. Does it change the original array?
2. What does it return?
```

---

# 1. `slice()` vs `splice()`

## `slice()`

`slice()` copies a portion of an array and returns a **new array**.It does **not** change the original array.
* Syntax: ```array.slice(start, end)```
* Behavior: It copies from the start index up to, but not including, the end index.
* Omitted parameters: If you pass no arguments, it clones the entire array.

```js
let arr = [10, 20, 30, 40, 50];
Extract elements from index 1 up to index 4 (excluded)
let result = arr.slice(1, 4);

console.log(result); // [20, 30, 40]
console.log(arr);    // [10, 20, 30, 40, 50]
```


---

## `splice()`

`splice()` changes the original array.This method directly modifies the data structure in place.
* Syntax: array.splice(start, deleteCount, item1, item2, ...)
* Behavior: It goes to the start index, removes the number of items specified by deleteCount, and then inserts any new items at that position.
* Returns: It returns what was removed. If nothing was removed, it returns an empty array.
  
It can:

```js
remove elements
add elements
replace elements
```

```js
let arr = [10, 20, 30, 40, 50];

let removed = arr.splice(1, 2);//Start from index 1.Remove 2 elements

console.log(removed); // [20, 30]
console.log(arr);     // [10, 40, 50]
```

```
const colors = ['Red', 'Green', 'Blue'];

// At index 1, remove 1 item ('Green'), and insert 'Yellow' & 'Purple'
const removed = colors.splice(1, 1, 'Yellow', 'Purple');

console.log(removed); // ['Green'] (The item that was removed)
console.log(colors);  // ['Red', 'Yellow', 'Purple', 'Blue'] (Original array changed)
```

---

## `splice()` adding elements

```js
let arr = [10, 20, 50];

arr.splice(2, 0, 30, 40);

console.log(arr); // [10, 20, 30, 40, 50]
```

Here:

```js
arr.splice(2, 0, 30, 40);
```

means:

```js
Start at index 2
Remove 0 elements
Add 30 and 40
```

---

## `splice()` replacing elements

```js
let arr = [10, 20, 30, 40];

arr.splice(1, 2, 99, 100);

console.log(arr); // [10, 99, 100, 40]
```

Here:

```js
arr.splice(1, 2, 99, 100);
```

means:

```js
Start at index 1
Remove 2 elements: 20, 30
Insert 99, 100
```

---
# `slice` vs `splice` Table

| Method     | Changes original array? | Returns          | Main use                    |
| ---------- | ----------------------: | ---------------- | --------------------------- |
| `slice()`  |                      No | New copied array | Copy part of array          |
| `splice()` |                     Yes | Removed elements | Add/remove/replace elements |

---

# 2. `join()` vs `concat()` vs `push()` vs `unshift()`

## `join()`

`join()` converts array elements into a **string**.

It does **not** change the original array.

```js
let arr = ["I", "love", "JS"];

let result = arr.join(" ");

console.log(result); // "I love JS"
console.log(arr);    // ["I", "love", "JS"]
```

Default separator is comma:

```js
let arr = [1, 2, 3];

console.log(arr.join()); // "1,2,3"
```

Custom separator:

```js
console.log(arr.join("-")); // "1-2-3"
console.log(arr.join(""));  // "123"
```

Memory:

```js
join = join array elements into a string
```

---

## `concat()`

`concat()` combines arrays or values and returns a **new array**.

It does **not** change the original array.

```js
let arr1 = [1, 2];
let arr2 = [3, 4];

let result = arr1.concat(arr2);

console.log(result); // [1, 2, 3, 4]
console.log(arr1);   // [1, 2]
```

It can also add values:

```js
let arr = [1, 2];

let result = arr.concat(3, 4);

console.log(result); // [1, 2, 3, 4]
```

Important:

```js
concat returns a new array
```

So this does not modify the original:

```js
let arr = [1, 2];

arr.concat(3);

console.log(arr); // [1, 2]
```

Correct:

```js
let result = arr.concat(3);

console.log(result); // [1, 2, 3]
```

Memory:

```js
concat = concatenate arrays into a new array
```

---

## `push()`

`push()` adds elements to the **end** of the original array.

It mutates the array.

It returns the **new length**.

```js
let arr = [1, 2];

let result = arr.push(3);

console.log(arr);    // [1, 2, 3]
console.log(result); // 3
```

Add multiple values:

```js
let arr = [1, 2];

arr.push(3, 4, 5);

console.log(arr); // [1, 2, 3, 4, 5]
```

Memory:

```js
push = push to the back/end
```

---

## `unshift()`

`unshift()` adds elements to the **start** of the original array.

It mutates the array.

It returns the **new length**.

```js
let arr = [2, 3];

let result = arr.unshift(1);

console.log(arr);    // [1, 2, 3]
console.log(result); // 3
```

Add multiple values:

```js
let arr = [3, 4];

arr.unshift(1, 2);

console.log(arr); // [1, 2, 3, 4]
```

Memory:

```js
unshift = add before the current first element
```

---

# Main Comparison Table

| Method      | Purpose                 | Changes original array? | Returns          |
| ----------- | ----------------------- | ----------------------: | ---------------- |
| `slice()`   | Copy part of array      |                      No | New array        |
| `splice()`  | Add/remove/replace      |                     Yes | Removed elements |
| `join()`    | Convert array to string |                      No | String           |
| `concat()`  | Merge arrays/values     |                      No | New array        |
| `push()`    | Add to end              |                     Yes | New length       |
| `unshift()` | Add to start            |                     Yes | New length       |

---

# Very Important Return Values

This is where many bugs happen.

## `push()` returns length, not array

```js
let arr = [1, 2];

let result = arr.push(3);

console.log(result); // 3
console.log(arr);    // [1, 2, 3]
```

Wrong expectation:

```js
// result is not [1, 2, 3]
```

---

## `unshift()` returns length, not array

```js
let arr = [2, 3];

let result = arr.unshift(1);

console.log(result); // 3
console.log(arr);    // [1, 2, 3]
```

---

## `concat()` returns new array

```js
let arr = [1, 2];

let result = arr.concat(3);

console.log(result); // [1, 2, 3]
console.log(arr);    // [1, 2]
```

---

## `join()` returns string

```js
let arr = [1, 2, 3];

let result = arr.join("-");

console.log(result);        // "1-2-3"
console.log(typeof result); // "string"
```

---

## `splice()` returns removed elements

```js
let arr = [10, 20, 30, 40];

let result = arr.splice(1, 2);

console.log(result); // [20, 30]
console.log(arr);    // [10, 40]
```

---

# How to Remember Quickly

## Methods that do not mutate original array

```js
slice
concat
join
```

Memory:

```js
slice = copies
concat = creates new combined array
join = creates string
```

They return something new.

---

## Methods that mutate original array

```js
splice
push
unshift
```

Memory:

```js
splice = surgery on original
push = add to original end
unshift = add to original start
```

They change the array.

---

# Direction Memory Trick

```js
push      -> add at end
unshift   -> add at start
pop       -> remove from end
shift     -> remove from start
```

Think of an array like a queue:

```js
[start] 1, 2, 3 [end]
```

```js
unshift(0)  -> [0, 1, 2, 3]
push(4)     -> [1, 2, 3, 4]
shift()     -> removes 1
pop()       -> removes 3
```

---

# `join()` vs `concat()`

These two are often confused.

## `concat()`

Array result:

```js
[1, 2].concat([3, 4]);
// [1, 2, 3, 4]
```

## `join()`

String result:

```js
[1, 2, 3, 4].join("-");
// "1-2-3-4"
```

Memory:

```js
concat -> array + array = array
join   -> array elements joined as string
```

---

# `concat()` vs `push()`

Both can add values, but they behave differently.

## `concat()`

Does not mutate.

```js
let arr = [1, 2];

let result = arr.concat(3);

console.log(arr);    // [1, 2]
console.log(result); // [1, 2, 3]
```

## `push()`

Mutates.

```js
let arr = [1, 2];

let result = arr.push(3);

console.log(arr);    // [1, 2, 3]
console.log(result); // 3
```

Memory:

```js
concat = returns new array
push = changes original array
```

---

# Final Cheat Sheet

```js
// Copy part, no mutation
arr.slice(start, end);

// Cut/add/replace, mutates
arr.splice(start, deleteCount, items...);

// Convert to string
arr.join(separator);

// Merge into new array
arr.concat(valuesOrArrays);

// Add to end, mutates, returns length
arr.push(value);

// Add to start, mutates, returns length
arr.unshift(value);
```

Best memory line:

```js
slice copies, splice cuts.
join strings, concat combines.
push ends, unshift starts.
```

### Question1 
 What would be the output of following code?
 ```
(function(){
	var animal = ['cow','horse'];
		animal.push('cat');
		animal.unshift('dog','rat','goat');
		console.log(animal);
})();
//a.[ 'dog', 'rat', 'goat', 'cow', 'horse', 'cat' ]
//b.[ 'cow', 'horse', 'cat', 'dog', 'rat', 'goat' ]
//c.Type Error
//d.undefined
```
ans-a
### Question 2
What would be the output of following code?
```
(function() {
	var array = new Array('100');
	console.log(array);
	console.log(array.length);
}());
/*Options:
a.undefined undefined
b.[undefined × 100] 100
c.["100"] 1
d.ReferenceError: array is not defined
ans=c.
```


### Question 3 
```
(function(){
	var containers = [2,0,false,"", '12', true];
	var containers = containers.filter(Boolean);
	console.log(containers);
	var containers = containers.filter(Number);
	console.log(containers);
	var containers = containers.filter(String);
	console.log(containers);
	var containers = containers.filter(Object);
	console.log(containers);		
})(); 

/* Options
a.[ 2, '12', true ] [ 2, '12', true ] [ 2, '12', true ] [ 2, '12', true ]
b. [false, true] [ 2 ] ['12'] [ ]
c. [2,0,false,"", '12', true] [2,0,false,"", '12', true] [2,0,false,"", '12', true] [2,0,false,"", '12', true]
d. [ 2, '12', true ] [ 2, '12', true, false ] [ 2, '12', true,false ] [ 2, '12', true,false]

ans-a.
```
Explanation:str.filter(Number);
If the array contains a number in the form of string, then the resulting array will have the number in the form of string.
In case of array:["a","b","1","2","c"], the resulting array will be ["1", "2"].

If the original array contains 0 or "0", then they will not be present in the resulting array.

If resulting array should include only integer numbers,

str.filter(Number.isInteger)
This will exclude the number in the form of string like "1", "2", etc.

For both integer and float numbers,

str.filter(Number.isFinite)
### Question4
What would be the output of following code ?
```
(function() {
	var greet = 'Hello World';
	var toGreet = [].filter.call(greet, function(element, index) {
		return index > 5;
	});
	console.log(toGreet);
}());
 /*
 Options:
a.Hello World b.undefined c.World d.[ 'W', 'o', 'r', 'l', 'd' ]
ans=d
*/
```
### Question 5 
 What would be the output of following code?
 ```
(function() {
	var array1 = [];
	var array2 = new Array(5);
	var array3 = new Array(['1',2,'3',4,5.6]);
	console.log(array1);//[]
	console.log(array2); //[undefined, undefined, undefined, undefined, undefined]
	console.log(array3);//[["1", 2, "3", 4, 5.6]]
	console.log(array3.length); //1
}());
```
### Question 6
```
 (function () {
  var array = new Array('a', 'b', 'c', 'd', 'e');
  array[10] = 'f';
  delete array[10];
  console.log(array);//["a", "b", "c", "d", "e", undefined, undefined, undefined, undefined, undefined, undefined]
  console.log(array.length); //11
}());
 ```
### Question 7
```
 (function(){
	var array = [1,2,3,4,5];
	console.log(array.indexOf(2)); //1
	console.log([{name: 'John'},{name : 'John'}].indexOf({name:'John'}));//-1
	console.log([[1],[2],[3],[4]].indexOf([3])); //-1
	console.log("abcdefgh".indexOf('e')); //4
})();
```
### Question 8
```
var arr1 = ['sue', 'kathy','tom'];
function checkValue(){
 if(!arr1.indexOf('tommy'))
 {
  console.log('Tommy not found');	
 }
 else 
 {
   console.log("tommy found");
 }
}
console.log(checkValue());//tommy found;
```
Explanation:! operator inverts the value of an expression,when we find indexOf('tommy') in arr1 , we get -1 as output,which is a truthy value
But that gets inverted by !, so the whole expression is false,and hence we dont proceed with if block
Rather,else block executes
### Question 9
```
var arr1 = ['sue', 'kathy','tom'];
function checkValue(){
 if(!!arr1.indexOf('tommy'))
 {
  console.log('Tommy not found');	
 }
 else 
 {
   console.log("tommy found");
 }
}
console.log(checkValue());
/**!! is used to convert the value to its boolean equivalence */
```
