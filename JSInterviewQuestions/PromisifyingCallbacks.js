/* You might want to then or await JavaScript’s setTimeout or setInterval, functions. promisifying 
setTimeout may be simple, and setInterval is a tad trickier, so make sure you understand promises. */


/*
setTimeout Promisified
*/

const setTimeoutPromisified=function(seconds){
   return new Promise(function(resolve)
   {
     setTimeout(resolve,seconds*1000);
   });
}

/*Consuming the above build promise*/
setTimeout(2)
.then(()=>{
 console.log("I got logged after 2 seconds");
);

/* Chaining on promisified setTimeout */

setTimeoutPromisified(4)
.then(()=>{
 console.log("I got logged after 4 seconds");
  return setTimeoutPromisified(3)
})
.then(()=>{
  console.log("I got logged after 7(=3+4) seconds");
  return setTimeoutPromisified(4);
})
.then(()=>{
  console.log("I got logged after 11(=3+4+4) seconds");
})
//Output of the chained setTimeout:
/*
I got logged after 4 seconds
I got logged after 7(=3+4) seconds
I got logged after 11(=3+4+4) seconds

*/
