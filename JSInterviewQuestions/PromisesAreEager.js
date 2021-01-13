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
/******************how to make promises lazy****************************/
//Consider the above example
 const greetingPoster = function(){
    return new Promise((resolve, reject) => {
  console.log('Inside Promise (Is it eager Now???)');
  resolve('Welcome! Nice to meet you.');
});
}
 //now unless and untill we explicitly call the function that wraps the promise,the promise contents don't get printed
 //So only when we run the following code ,will we have the  logs
 greetingPoster();//Inside Promise (Is it eager Now???)
//Inside Promise()

//If we run
greetingPoster()
.then(res=>{
  console.log(res)
})
//Inside Promise (Is it eager Now???)
//Welcome! Nice to meet you.

/*If the intent is to create a Promise that allows control of when it starts executing,i.e ,make a promise as lazy, there are no native options. 
If you want the function passed to the Promise to run multiple times, Promises don't natively allow that either.

***To change the default behavior then Promise creation has to be wrapped in another function which can be invoked as many times as needed:****/
