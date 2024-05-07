```
function compare(input) {
  return !!(input == 1 || input == 2 || input == 3);
}

console.log(compare(0));
console.log(compare(1));
console.log(compare(2));
console.log(compare(3));
console.log(compare(4));
console.log(compare([1]));
console.log(compare([2]));
console.log(compare([3]));
```
output:false true true true false true true true  

Explanation:when we use == then it implicitly type cast operands.Therefore, 
[1] will become "1" and then 1. 
Similarly, for all arrays type casting will take place.


 
##### q-2-What is the time complexity?
```
function findIntersection(first, second) {
  const firstSet = new Set(first);

  return second.reduce((acc, current) => {
    return firstSet.has(current) ? [...acc, current] : acc;
  }, []);
}

function init() {
  const first = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const second = [1, 2, 3, 4, 5];
  console.log(findIntersection(first, second));
}
```
ans-O(n^2)  

/*// loops n times i.e. O(n)
return second.reduce((acc, current) => {
    // spread operator operation would be O(n) every time
	return firstSet.has(current) ? [...acc, current] : acc;
}, []);
Hence, overall time complexity would be O(n^2).

P.S. This is not the best way to find intersection and approach can be improved so please
do not use this code anywhere. 
Code is written in a certain way to test logic


##### q-3 What would be the output?
```
const first = 6;
const second = "6";
const third = first + second;
const fourth = first - second;
const fifth = third + first * first;
const sixth = fourth + second * second;

console.log("Fifth is --", fifth, typeof fifth);
console.log("Sixth is --", sixth, typeof sixth);
```
Options:
a.                                                                
Fifth is -- 1236 string                                                                  
Sixth is -- 6666 string                                              
b.
  Fifth is -- 6636 string
  Sixth is -- 36 number

c.  
 Fifth is -- 1266 string
   Sixth is -- 66 number 
d.Fifth is -- 6666 string   
  Sixth is -- 36 string
ans-b

##### q-4
```
var x = 'global';
var y = function(){
  console.log(this.x);
}

y();
y.bind(this);
y();
new y();
//Output:global, global, undefined
```

##### q-5 What will be the width of the element?
```
.container {
  width: 100px;
  height: 100px;
  padding: 30px;
  border: 30px solid lightblue;
  margin: 30px;
}
//ans-220px
//box-sizing:container-box  (applied by default unless specifies as border-box)
```
/*************************************Important question*********************/
##### Output question based on the delete operator in JavaScript
```
var person = "Yomesh";

var deletePerson = () => {
  delete person;
  return person;
};

console.log(deletePerson());
```
/*Options
a.undefined b.uncaught error c.Yomesh d.No output
ans- c.Yomesh
Explanation:We can't delete a local variable that has been declared with var/let/const.

We can only delete properties of objects. This also includes global variables which are
implicit properties of the window object. As per the MDN --

The JavaScript delete operator removes a property from an object

If we change the code to the following then delete will work.
```
window.person = "Yomesh";

var deletePerson = () => {
  delete window.person;
  return window.person;
};
```
console.log(deletePerson()); // undefined
To read more -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
*/


### How to implement pipe utility? 

In this question, the candidate needs to implement a utility called pipe that takes n 
functions as input and returns a function that can be invoked to compute the final result
by invoking each input  function and providing the previous functions' output as an argument.

#### Syntax
pipe(fn1, fn2, fn3, .... n)(input);
#### Arguments
A list of input functions to be executed
#### Returns
A function that can be invoked to compute the final value

#### Example
```
const getName = (object) => object.name;
const makeUpperCase = (string) => string.toUpperCase();
const slice = (string) => string.slice(0, 3);

const method = pipe(getName, makeUpperCase, slice);

const value = method({ name: 'devtools' });

console.log(value);
```

#### Code:
```
function pipe() {
  // write your code below
  let args= Array.from(arguments);

  return function(input){
    let inp=input;
    for(let i=0;i<args.length;i++){
        inp= args[i](inp);
    }
    return inp;
  }
}
```
### How to implement a function to convert a string input into an object? | Razorpay Interview Question | JavaScript

In this question, the candidate needs to implement a function that takes a string and final value as inputs. It returns a new object created based on it.


#### Syntax
stringToObject(input, finalValue);
#### Arguments
input (String): The object path from which we need to create an object.
finalValue (any): The final leaf node value.
Return
a newly created object
#### Example
stringToObject('a.b.c', 1);
// { a: { b: { c: 1 } } }

stringToObject('', 1);
// throw a TypeError

stringToObject('a."b.c"."d.e"', 2);
// consider "b.c" and "d.e" as individual keys
// output => { a: { 'b.c': { 'd.e': 2 } } }

stringToObject('users.0.name', 'devtools tech')
// users would be an array that contains one single object with name property with final value
// { users: [{ name: 'devtools tech' }] }

```
/**
 * Read FAQs section on the left for more information on how to use the editor
**/
// DO NOT CHANGE THE FUNCTION NAME

function stringToObject(input, finalValue) {
  // write your code below
  if(input.length==0)
  throw new TypeError("Empty")
  let pattern = [];
  let i = 0;
  let open = 0;
  let key = '';
  let obj={};
  let res=obj;
  while (i < input.length) {
    if (input[i] == '"') {
      if (!open) {
        open = 1;
      }
      else {
        //console.log(pattern)
        pattern.push(key);
        key = '';
        open = 0;
      }
    }
    else if (input[i] == '.') {
      if (open) {
        key = key + input[i];

      }
      else {

        if (key)
          pattern.push(key);

        key = ''
      }
    }
    else {

      key = key + input[i];
      if (i == input.length - 1)
        pattern.push(key);

    }
    i++;
  }
  for(let i=0;i<pattern.length;i++){
    if(i==pattern.length-1){
     obj[pattern[i]]=finalValue;
    }
    else{
      if(isNaN(Number(pattern[i+1]))){
        obj[pattern[i]]={};
        obj=obj[pattern[i]];
      }
      else{
        obj[pattern[i]]=[];
        obj= obj[pattern[i]];
      }
    }
  }
  return res;
}
```
### How to check deep equality between JavaScript objects? | Zeta Frontend Interview Question

In this question, the candidate needs write a function called deepEqual that checks deep equality between two JavaScript objects. It should perform a deep comparison between two objects to determine if they are equivalent.

#### Syntax
deepEqual(value, other);
Arguments
value (Object): The value to compare.
other (Object): The other value to compare.
Returns
boolean: Returns true if the values are equivalent, else false.
#### Examples
let value = { a: 1 };
let other = { a: 1 };

deepEqual(value, other);
// => true

value = { a: { b: { c: { d: 2 } } } };
other = window.structuredClone(value);

deepEqual(value, other);
// => true

value = { a: 2 };
other = { a: 3 };

deepEqual(value, other);
// => false  

deepEqual();
// => true

value = { a: 1 };
other = null;

deepEqual(value, other);
// => false

value = { a: 1 };
other = undefined

deepEqual(value, other);
// => false

value = { a: 1 };

deepEqual(value);
// => false

```
/**
 * Read FAQs section on the left for more information on how to use the editor
**/
// DO NOT CHANGE FUNCTION NAME


function traverseObject(value, other) {

  if (value && other && Object.keys(value).length > 0 && Object.keys(other).length > 0) {
    let keyValues = Object.keys(value);
    let keyOther = Object.keys(other);
    for (let i = 0; i < Object.keys(value).length; i++) {
      if (Object.keys(value[keyValues[i]]).length > 0)
        return true && traverseObject(value[keyValues[i]], other[keyOther[i]]);
      else {
        if (value[keyValues[i]] == other[keyOther[i]])
          return true;
        else
          return false;
      }

    }
  }

}
function deepEqual(value, other) {
  'use strict';
  // write your solution below
  if(!value && !other)
  return true
  if (!value || !other || !Object.keys(other).length || !Object.keys(value).length || Object.keys(value).length != Object.keys(other).length)
    return false;
  return traverseObject(value, other);
 
}
```
### How to create a toggle function in JavaScript? | Frontend Problem Solving | JavaScript Interview Question
In this question, you need create a function toggle that accepts an array as input and toggles between the values in a cyclic manner.

const animals = ['dog', 'cat', 'elephant', 'tiger', 'lion']; 
const toggled = toggle(animals);

toggled(); // returns dog
toggled(); // returns cat
toggled(); // returns elephant
toggled(); // returns tiger
toggled(); // returns lion
toggled(); // returns dog
...
This question is based on the concept that you might require to build a toggle functionality between two values like on or off 
in your web-app. A more advanced use-case could be that you need to generate a captcha or a word whenever clicks on a button.
You can initialise your code with a list of items and the user would be presented with the next item in the list whenever
they click on the button.
### Specifications
Input value should be an array with length >= 1.
If input parameter type is not an array then throw a TypeError.
If input array length <= 0 then throw an error.
The toggle function should cycle between the values in clockwise direction.
Your solution should pass all the test cases.

```
function toggle(list) {
  // write your solution below

  if (!list || !Array.isArray(list)) {
    throw new TypeError(
      'Toggle function can only be called on an Array. Invalid input provided.'
    );
  }

  const length = list.length;

  if (!length) {
    throw new TypeError('Input array must have atleast one element.');
  }

  let index = -1;

  return function toggled() {
    // if a single element array then early escape condition
    if (length === 1) {
      return list[0];
    }

    // increment the iterator
    index += 1;

    // making sure that index does not go out of array bounds
    // if array length is 6 and current index is 5
    // (5 + 1) % 6 => 0 => resets to start of the array
    index = index % length;

    return list[index];
  };
}
```

### Question: what is the output of the following code?

const name = { firstName: "devtools", lastName: "tech" };
const nameCopy = name;

nameCopy.firstName = "dev";

// what would be the output of the following?
console.log(name); // { firstname: 'dev', lastname: 'tech' }

### Question:
Given a deeply nested array,create a function on array ,namely flatten,that when involed returns a flat version of original array.
The function should be defined in a way that it can be  invoked on existing & future arrays**/

#### Input:
[
1,2,3,
[4],
[5,6,[7],[8,[9,[10]]]],
11,12,13,
[14,[[[[[15,[16]]]]]]],
17,18,
[19,[20,[21,[22,[23,[24,[[[[[25]]]]]]]]]]]
]
#### Output:
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

 #### Approach 1
```
function flatten()
{
const output=[];
  function processing(arr)
  {
     for(let i=0;i<arr.length;i++)
     {
       if(Array.isArray(arr[i]))
       processing(arr[i]);
       else
       output.push(arr[i]);
     }
  }
  processing(this);
  return output;
}
Array.prototype.flatten=flatten;
```
let nestedArray=[
1,2,3,
[4],
[5,6,[7],[8,[9,[10]]]],
11,12,13,
[14,[[[[[15,[16]]]]]]],
17,18,
[19,[20,[21,[22,[23,[24,[[[[[25]]]]]]]]]]]
]
console.log(nestedArray.flatten());
####  Approach2
```
function flatten(){
return this.toString().split(',').map(el=>Number(el));
}
Array.prototype.flatten=flatten;
```
#### Explanation:
The function toString() on our nested array gives the following result:
"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25"
i.e a stringified and non nested version of the nested array.That can further be converted to the array

#### Approach 3:Using a stack
```
function flatten(input) {
  const stack = [...input];
  const res = [];
  while(stack.length) {
    // pop value from stack
    const next = stack.pop();
    if(Array.isArray(next)) {
      // push back array items, won't modify the original input
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // reverse to restore input order
  return res.reverse();
}

const arr = [1, 2, [3, 4, [5, 6]]];
flatten(arr);
```

#### follow up questions for the above program

Can we solve the above program by mutating the original array itself and not using extra space?
flatten only uptil a particular depth

/***to flatten 1 level array ***************/
```
const arr = [1, 2, [3, 4]];

// To flat single level array
arr.flat();
// is equivalent to
arr.reduce((acc, val) => acc.concat(val), []);
// [1, 2, 3, 4]
/* Another approach to flatten 1 level nested array*/
const arr = [1, 2, [3, 4,5,6,7]];

const flattened = arr => [].concat(...arr);
console.log(flattened(arr));
```
/**************To flatten upto a particular depth***********/
```
const arr = [1, 2, [3, 4, [5, 6]]];

// to enable deep level flatten use recursion with reduce and concat
function flatDeep(arr, d = 1) {
   return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
                : arr.slice();
};

flatDeep(arr, Infinity);//we can pass depth as 1,2 or infinity,etc
```
