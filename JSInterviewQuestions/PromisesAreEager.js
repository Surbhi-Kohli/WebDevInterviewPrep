/***************************************************Promises are eager****************************************************/
//Predict the output:
const greetingPoster = new Promise((resolve, reject) => {
  console.log('Inside Promise (proof of being eager)');
  resolve('Welcome! Nice to meet you.');
});

console.log('Before calling then on Promise');

greetingPoster.then(res => console.log(`Greeting from promise: ${res}`));

Output:
/* "Inside Promise (proof of being eager)"
"Before calling then on Promise"
"Greeting from promise: Welcome! Nice to meet you." */

/*  Promises are eager, meaning that a PROMISE WILL START DOING WHATEVER TASK YOU GIVE it as soon as
the promise constructor is invoked. If you need lazy, check out observables or tasks. */

/********************************************** Promises are asynchronous******************************************************************/
/*     Observable can be synchronous
Promise is always ASYNCHRONOUS. Even if it’s immediatelly resolved.                    */

const greetingPoster = new Promise((resolve, reject) => {
  resolve('Welcome! Nice to meet you.');
});

console.log('Before calling then on Promise');

greetingPoster.then(res => console.log(`Greeting from promise: ${res}`));

console.log('After calling then on Promise (proof of being always async)');
/*Output:
"Before calling then on Promise"
"After calling then on Promise (proof of being always async)"
"Greeting from promise: Welcome! Nice to meet you."

The message from within then method callback function will be the last one even though the Promise is resolved without a delay, 
since the call is added to the microtasks queue which will be processed after the current macrotask’s completion.
*/
