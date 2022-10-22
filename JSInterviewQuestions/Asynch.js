

/* CHALLENGE 1 */

function sayHowdy() {
  console.log('Howdy');
}

function testMe() {
  setTimeout(sayHowdy, 0);
  console.log('Partnah');
}
// After thinking it through, uncomment the following line to check your guess!
 testMe(); // what order should these log out? Howdy or Partnah first?

/*
Output:
'Partnah'
'Howdy'
*/

/*
Challenge 2
Create a function delayedGreet that console logs welcome after 3 seconds.

function delayedGreet() {
  // ADD CODE HERE
}*/

function delayedGreet() {
  setTimeout(()=>console.log("welcome"),3000)
}
// Uncomment the following line to check your work!
 delayedGreet(); // should log (after 3 seconds): welcome

/*Challenge 3
Create a function helloGoodbye that console logs hello right away, and good bye after 2 seconds.
*/
function helloGoodbye() {
  // ADD CODE HERE
  setTimeout(()=>console.log("good bye"),2000)
  console.log("hello")
}
helloGoodbye(); // should log: hello // should also log (after "3" seconds): good bye

/*Challenge 4
Create a function brokenRecord that console logs hi again every second.
Use the End Code button to stop the console logs when you are satisfied that it is working.*/

function brokenRecord() {
  // ADD CODE HERE
  setInterval(()=>console.log("hi"),1000);
}
/*
Challenge 5
Create a function limitedRepeat that console logs hi for now every second, but only for 5 seconds. 
Research how to use clearInterval if you are not sure how to do this.
*/
function limitedRepeat() {
  // ADD CODE HERE
}

/*
Challenge 7
Write a function delayCounter that accepts a number (called 'target') as the first argument and
a number of milliseconds (called 'wait') as the second argument, and returns a function.
When the returned function is invoked, it should log to the console all of the numbers between 1 and the target number, 
spaced apart by 'wait' milliseconds.
*/
function delayCounter(target, wait) {
  const funcInner=()=>{
    let k=1;
   setInterval(()=>{
     if(k<=target){
       console.log(k);
       k++}
   }
     ,wait) 
  }
  return funcInner;
}

// UNCOMMENT THESE TO TEST YOUR WORK!
const countLogger = delayCounter(3, 1000)
countLogger();
// After 1 second, log 1
// After 2 seconds, log 2
// After 3 seconds, log 3

/*
Challenge 8
Write a function, promised, that takes in a value. This function will return a promise that will resolve after 2 seconds.

Hint: take a look at the Promise object docs on MDN.
*/

/*
Challenge 9
Write a SecondClock class, with two methods: start and reset.​
start: upon invocation, invokes a callback (this.cb, defined in the constructor) on an argument every second, with the argument to the callback being the current seconds "value".

In other words, the callback gets invoked every second on the "seconds hand" of the clock. Always start with 1 and don't utilize the seconds value of the current computer clock time.

The first "tick" with value 1 occurs 1 second after the initial "secondClock" invocation.
The second "tick" with value 2 occurs 2 seconds after the initial "secondClock" invocation.
...
The sixtieth "tick" with value 60 occurs 60 seconds after the initial "secondClock" invocation.
The sixty-first "tick" with value 1 occurs 61 seconds after the initial "secondClock" invocation.
The sixty-second "tick" with value 2 occurs 62 seconds after the initial "secondClock" invocation.
etc.
reset: upon invocation, completely stops the "clock".
Also resets the time back to the beginning.

Hint: look up setInterval and clearInterval.

*/
