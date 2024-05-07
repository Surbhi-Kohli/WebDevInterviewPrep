###  Filter polyfill 
```
Array.prototype.myFilter=function(callback,context)
{
  let arr=[];
  for(let i=0;i<this.length;i++)
  {
    if(callback.call(context,this[i],i,this))
    {
      arr.push(this[i]);
    }
  }
  return arr;

}
let arr2=[1,2,4,5,6,7,8];
let ans=arr2.myFilter((num,i)=>{
    if(num%2 ===0)
    return true;
})
console.log(ans); //[2,4,6,9]
```
### Map polyfill 
```
Array.prototype.myMap=function(callback,context)
{
  let arr=[];
  for(let i=0;i<this.length;i++)
  {
    let el=callback.call(context,this[i],i,this);
      arr.push(el);
    
  }
  return arr;

}
let arr2=[1,2,4,5,6,7,8];
let ans=arr2.myMap((num,i)=>{
    return num%2;
})
console.log(ans);//[1,0,0,1,0,1,0]
```
###  bind polyfill   
```
Function.prototype.myBind=
function(){
  let arg=Array.prototype.slice.call(arguments);
  let context=arg[0];
  let params=arg.slice(1);
   let funcToBeCalled=this;
   return function(){
     let params2=Array.prototype.slice.call(arguments);
     return funcToBeCalled.apply(context,params.concat(params2));
   }
}
let basic = {
  'name': 'Surbhi',
  'age': 24
};

function callMe(city) {
  console.log('Hi!i m ' + this.name + ', my age is ' + this.age + ' and my city is ' + arguments[0] + ' and state is ' + arguments[1]);
}
let callBinded = callMe.myBind(basic, 'ASR');
callBinded('Punjab')//Hi!i m Surbhi, my age is 24 and my city is ASR and state is Punjab
```
###  Reduce Polyfill  

```
Array.prototype.myReduce = function(fn, initial) {
    let values = this;

    values.forEach(item => {
        initial = initial !== undefined ? fn(initial, item) : item
    })

    return initial;
}
var values = [2, 5, 5]
values.reduce((a, b) => a * b)  // 50
values.myReduce((a, b) => a * b)  // 50
```
###  Object Deep clone 
```
function deepClone(object) {
  var newObject = {};
  for (var key in object) {
    if (typeof object[key] === "object" && object[key] !== null) {
      newObject[key] = deepClone(object[key]);
    } else {
      newObject[key] = object[key];
    }
  }
  return newObject;
}
```
###  for each       
```
Array.prototype.eachAlbum = function(callback) {
  // callback here is the callback function
  // which actual .forEach() function accepts
  for (var i = 0; i < this.length; i++) {
    callback(this[i], i, this) // currentValue, index, array
  }
}
```
### debounce polyfill  
```
const debounce = function (fn, d) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, d);
  };
};
button.addEventListener('click', debounce(function() { 
		alert("No matter how many times you" + 
			"click the debounce button, I get " + 
			"executed only after 3 seconds of clicking n then stopping") 
						}, 3000));
```
#### Why do we clear existing timer before a new setTimeout?

Clearing the existing timer before setting a new one is a crucial step in implementing a debounce function.
Here's why we do it:

#### Prevents Concurrent Execution: 
If we don't clear the existing timer, subsequent calls to the debounced function will set up new timeouts without canceling the previous ones. This can lead to multiple executions of the debounced function, which defeats the purpose of debouncing. By clearing the existing timer, we ensure that only one timeout is active at any given time.

#### Updates the Delay Time: 
If the debounced function is called multiple times in quick succession, we want to reset the timer to ensure that the debounced function only executes after the last call and the specified delay has elapsed since that last call. Clearing the existing timer and setting a new one with the updated delay ensures that the function won't execute until the specified delay has passed since the last invocation.

Here's how it works step by step:

When the debounced function is called, the existing timer is cleared using clearTimeout(timer).
A new timeout is set using setTimeout, which will execute the debounced function after the specified delay (d).
If the debounced function is called again before the specified delay has elapsed, the existing timer is cleared, effectively resetting the delay.
This process repeats until there's no further invocation of the debounced function within the delay period, at which point the debounced function executes.
In summary, clearing the existing timer ensures that the debounced function will only execute once, after the specified delay, regardless of how many times it's invoked within that delay period.






### throttle polyfill 
```
const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
```
### Promise.all  

```
function allPromise(promises) {
  // return a new promise
  return new Promise((resolve, reject) => {
    // check promises count
    var promiseCount = promises.length;
    var promisedData = [];
    var settledCount = 0;

    // Check the status

    promises.forEach((promise, i) => {
      promise
        .then((data) => {
          // pushed in the array and increment count
          promisedData[i] = data;
          settledCount++;
          // check the promise count and settledCount
          if (settledCount === promiseCount) {
            resolve(promisedData);
          }
        })
        .catch((error) => {
          // if promise fail then reject
          reject(error);
        });
    });
  });
}
```

### Write a log function which will add prefix (your message) 
### to every message you log using console.log ?
```
function appLog() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift('your app name');
  console.log.apply(console, args);
}
appLog("hello");//"your app name", "hello"

function abc()
{
console.log("check");
}
console.log(abc);
abc.myLog("hhj");
//Or not adding it to prototype:
function appLog() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift('your app name');
  console.log.apply(console, args);
}

appLog("Some error message"); 
//output of above console: 'your app name Some error message'

```
Throttling:
Baby: Mom give me a piece of chocolate cake
Mom: No you can get one, only after 1 hour
(baby wont get a piece of cake no matter how many times she asked, but only after each hour)

Debouncing:
Baby: Mom give me a piece of chocolate cake, . . .Mom give me a piece of chocolate cake ... mom give me ...
Mom: No, You will get a piece of cake only after 1 hour from LAST time you asked for one.
