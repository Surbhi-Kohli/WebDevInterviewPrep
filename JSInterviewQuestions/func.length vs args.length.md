- arguments.length() //returns the length of actual no of parameters of the function
- abc.length() //returns the length of expected no of parameters of the function

- [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) is an array-like object accessible inside functions that contains the values of the arguments passed to that function.
```
function abc(a,b,c){
  console.log(arguments.length)->2
} 
abc(10,20,30);
console.log(abc.length); ->3
```
