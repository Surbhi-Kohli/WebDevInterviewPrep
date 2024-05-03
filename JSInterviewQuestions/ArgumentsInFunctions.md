What would be the output of following code ?
```
function myFunc() {
  console.log(arguments.length);
}
console.log(myFunc());
console.log(myFunc("a","b"));
console.log(myFunc("a","b","c","d"));
```
/*Options
a.2 2 2 b.0 2 4 c.undefined d.ReferenceError  
answer- 0 2 4
*/

/**********************function.length*************************/
```
function func1() {}

function func2(a, b) {}

console.log(func1.length);
// expected output: 0

console.log(func2.length);
// expected output: 2
```
/*
The length property indicates the number of parameters expected by the function.
length is a property of a function object, and indicates how many arguments the function expects, i.e. 
the number of formal parameters. 
This number excludes the rest parameter and only includes parameters before the 
first one with a default value. 
By contrast, arguments.length is local to a function and provides the number
of arguments actually passed to the function.
*/
/***********question2 :what would be the output**********************/
```
function myFunc(param1,param2) {
  console.log(myFunc.length);
}
console.log(myFunc());
console.log(myFunc("a","b"));
console.log(myFunc("a","b","c","d"));
```
/*Options:a.2 2 2 b.0 2 4 c.undefined d.ReferenceError
ans- a.2 2 2
*/
What will be the output for the following code snippet?

  ```
function add(){
  return () =>{
    console.log(arguments[0]);//Undefined
    return arguments[0]+arguments[1]};
}
console.log(add()(1,2,3));
```
a.3 b.6 c.Reference error d.None of these
ans-d.None of these
Output of the above code is NaN
As arguments keyword is not defined for arrow function.
Here the inner function is arrow function and we are passing
arguments to arrow function in function call statement.
If instead we proceeded as
  ```
function add(){
  return () =>{
    console.log(arguments[0]);//1
    return arguments[0]+arguments[1]};
}
console.log(add(1,2,3)());

```
Output would be 3 as we are passing arguments to normal function 
and that has access to arguments keyword,and the same can be accessed 
in arrow function because of scoping.

#### Q.Implement a function that returns the number of parameters expected by a function
  in JavaScript
```
function getParameterCount(inputFunction) {
  if (typeof inputFunction !== 'function') {
    throw new TypeError('Input must be a function');
  }
  return inputFunction.length;
}
```
