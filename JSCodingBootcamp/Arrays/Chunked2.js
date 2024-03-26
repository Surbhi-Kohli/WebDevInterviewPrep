/*Given an array and a chunk size,divide the array into many subarrays where each subarray
is of the provided size
Examples: chunk([1,2,3,4],2)  --> [[1,2],[3,4]]  
*/
function chunk(array,size){

  const chunked=[];
  let index=0;
  while(index<array.length){
  chunked.push(array.slice(index,index+size)); //second param is the index which is excluded
  index+=size;
  }
  return chunked;
  
  }


/*slice method in Javascript*/
Using slice() to convert array-like objects to arrays
The slice() method is often used with bind() and call() to create a utility method that converts an array-like object into an array.

JS
Copy to Clipboard
// slice() is called with `this` passed as the first argument
const slice = Function.prototype.call.bind(Array.prototype.slice);

function list() {
  return slice(arguments);
}

const list1 = list(1, 2, 3); // [1, 2, 3]
Using slice() on sparse arrays
The array returned from slice() may be sparse if the source is sparse.

console.log([1, 2, , 4, 5].slice(1, 4)); // [2, empty, 4]
