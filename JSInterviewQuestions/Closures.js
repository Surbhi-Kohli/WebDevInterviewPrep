 /*1.Predict the Output */                                                          |/* 2.Predict the Output */  
var a=10;                                                                           |  var a=10; 
function x(){                                                                       |   function x(){  
  var a=7;                                                                          |      var a=7;    
  function y(){                                                                     |      function y(){ 
    console.log(a);                                                                 |            console.log(a);  
  }                                                                                 |         }
  return y;                                                                         |       a=100;
}                                                                                   |       return y;
a=11;                                                                               |    }
var b=x();                                                                          |   a=11;
console.log(b());                                                                   |  var b=x();
                                                                                    |  console.log(b());
/*Output:7*/                                                                        |
/*Explanaion:function y formed a closure over its lexical env and so has access*/   |/* Output:100 as the function y encloses its lexical env and has a refernce to the 
/* to a(has a reference to a)*/                                                     |  /*variable a, so as it gets updated in its parent, the logged value is 100 */

/*_______________________________________________________________________________________________________________________________________________________________________*/

/*3. Predict the output */                                                         |/*4. Predict the output */
var a=10;                                                                          | function z(){
function x(){                                                                      |  var b=900;
  function y(){                                                                    |   function x(){
    console.log(a);                                                                |      var a=7;
  }                                                                                |       function y(){
  return y;                                                                        |         console.log(a);
}                                                                                  |          console.log(b);
a=11;                                                                              |       }
var b=x();                                                                         |      a=100; 
console.log(b());                                                                  |     y();
/* Output: 11,As y encloses its lexical env,but its immediate parent doesnt */     |    }
/*have a variable 'a', so it looks for grand arent,ie Window object here*/         |     x();
/*  in this case*/                                                                 |   }
                                                                                   |   z();
                                                                                   | /* output:100
                                                                                   |        900
                                                                                   | EXPLANATION:y has enclosed lexical scope of both its immediate parent as well 
                                                                                   | as its grand parent*/
/*________________________________________________________closure with let variables______________________________________*/
                                                                                    /*6.Predict the output  
 /*5. Predict the output */                                                       |  function outer(b){
                                                                                  |    function inner(){
  function outer(){                                                               |      console.log(a,b);
  function inner(){                                                               |      }
    console.log(a);                                                               |     let a=10;
  }                                                                               |     return inner;
  let a=10;                                                                       |    }
  return inner;                                                                   |  var close=outer('hello world');
}                                                                                 |   close();
var close=outer();                                                                |
  close();                                                                        |/*Output: 10 hello world*/
  /*Output:10  */                                                                 |/*EXPLANATION:The inner function enclosed the variable a as well as the passed param*/
                                                                                    
  /* _____________________________________________________________________________________________________________ */
  /*7. Predict the output */                                                   
  function outest(){
  var c=20;
    function outer(b)
   {
      function inner(){
      console.log(a,b,c);
      }
        return inner;
   }
   return outer;
 }
var close=outest()('hello world');
close();
 /* Output:error: Uncaught ReferenceError: a is not defined*/            
 /*__________________________________________________________________________________________*/
   /* Data privacy -advantage of closure */
 function counter(){
  var count=0;
 return function incrementCounter(){
    count++;
    console.log(count);
  }
}
var cnt=counter();
console.log(cnt());
console.log(cnt());
  /* Output:1 
            2 
    Explanation: if we need to update the count variable   
     we can only do so by calling the enclosed function*/  
  /******************************************/                                                                                  
  /*Scalable closure */
                                                                                    
  function Counter(){
  var count=0;
  this.incrementCounter=function(){
    count++;
    console.log(count);
  }
  this.decrementCounter=function(){
    count--;
    console.log(count);
  }
}
var counter=new Counter();
counter.incrementCounter(); //1
counter.incrementCounter(); //2
counter.decrementCounter(); //1
                                                                                   
 /*******************************************************************/
  //Q.what would be the output:
 function getDataFromServer(apiUrl){
    var name = "John";
	return {
		then : function(fn){
			fn(name);
		}
	}
}

getDataFromServer('www.google.com').then(function(name){
	console.log(name);
});
//John
											  
/*Javascript hardparts closures excercise*/
/*Challenge 1
Create a function createFunction that creates and returns a function. When that created function is called, it should print "hello". */
function createFunction() {
 const innerFunction=()=>{
   console.log("hello");
 }
 return innerFunction;
}
const function1 = createFunction();
 function1(); // => should console.log('hello');
		
	
/*Challenge 2
Create a function createFunctionPrinter that accepts one input and returns a function. When that created function is called, it should print out the input that was used when the function was created.
*/							
function createFunctionPrinter(input) {
  return function inner(){
    console.log(input);
  }

}										  
const printSample = createFunctionPrinter('sample');
printSample(); // => should console.log('sample');
const printHello = createFunctionPrinter('hello');
printHello(); // => should console.log('hello');
											  
											  
/*Challenge 3
Create a function cycleIterator that accepts an array, and returns a function. The returned function will accept zero arguments.
When first invoked, the returned function will return the first element of the array. When invoked a second time, the returned function will return the second element of the array, and so forth. After returning the last element of the array, the next invocation will return the first element of the array again, and continue on with the second after that, and so forth.*/		
function cycleIterator(array) {
  let count=0;
return function inner(){
    
  let ans;
     if(count<array.length)
          ans=array[count];  
    else
      ans= array[count-array.length];
	
 count++;
  return ans;
}
}	
const threeDayWeekend = ['Fri', 'Sat', 'Sun'];
const getDay = cycleIterator(threeDayWeekend);
console.log(getDay()); // => should log 'Fri'
console.log(getDay()); // => should log 'Sat'
console.log(getDay()); // => should log 'Sun'
console.log(getDay()); // => should log 'Fri'											  
	
											  
/*Challenge 4
Create a function defineFirstArg that accepts a function and an argument. Also, the function being passed in will accept at least one argument. defineFirstArg will return a new function that invokes the passed-in function with the passed-in argument as the passed-in function's first argument. Additional arguments needed by the passed-in function will need to be passed into the returned function.*/											  
function defineFirstArg(func, arg) {
const inner=(...args)=>{
  return func(arg,...args)
}
return inner;
}

/*** Uncomment these to check your work! ***/
const subtract = function(big, small) { return big-small; };

const subFrom20 = defineFirstArg(subtract, 20);
console.log(subFrom20(5)); // => should log 15
	
											  
/*Challenge 5
Write a function after that takes the number of times the callback needs to be called before being executed as 
the first parameter and the callback as the second parameter.*/		
function after(count, func) {
let callCounter=1;
  const inner=()=>{
    if(callCounter<count)
      { callCounter++;
      return;
      }
    else{
     func()
    }
  }
  return inner
}

const called = function() { console.log('hello') };
const afterCalled = after(3, called);
afterCalled(); // => nothing is printed
afterCalled(); // => nothing is printed
afterCalled(); // => 'hello' is printed											  
											  

											  
/* Challenge 6
Write a function delay that accepts a callback as the first parameter and the wait in milliseconds before allowing the callback to be invoked as the second parameter. Any additional arguments after wait are provided to func when it is invoked. HINT: research setTimeout();	
*/
function delay(func, wait) {
  return setTimeout((...args)=>{//setTimeOut here is closed in the delay func
    
    return func(...args)
  },wait)
}
}
/*Challenge 7
Write a function rollCall that accepts an array of names and returns a function. The first time the returned function is invoked, it should log the first name to the console. The second time it is invoked, it should log the second name to the console, and so on, until all names have been called. Once all names have been called, it should log 'Everyone accounted for'.
*/		
function rollCall(names) {
  let counter=0;
return function inner(){
 
  if(counter<names.length)
    {
     console.log(names[counter]);
    }
  else
    console.log("Everyone accounted for");
  
  counter++;
 
}
}

// /*** Uncomment these to check your work! ***/
const rollCaller = rollCall(['Victoria', 'Juan', 'Ruth'])
rollCaller() // => should log 'Victoria'
rollCaller() // => should log 'Juan'
rollCaller() // => should log 'Ruth'
rollCaller() // => should log 'Everyone accounted for'
											   
											   
/*Challenge 8
Write a function once that accepts a callback as input and returns a function. When the returned function is called the first time,
it should call the callback and return that output. If it is called any additional times, instead of calling the callback again it 
will simply return the output value from the first time it was called.*/											  
function once(func) {
  let counter=0;
  let firstCallRes;
  return function inner(input){
  
  if(counter==0)
    {
      firstCallRes=func(input);
      counter++;
      return firstCallRes;
    }
  else
    return firstCallRes;
}
}
console.log("***********");
/*** Uncomment these to check your work! ***/
const onceFunc = once((n)=>n+2);
console.log(onceFunc(4));  // => should log 6
console.log(onceFunc(10));  // => should log 6
console.log(onceFunc(9001));  // => should log 6											  
					
	
/*Challenge 9
Create a function dateStamp that accepts a function and returns a function. 
The returned function will accept however many arguments the passed-in function accepts, 
and return an object with a date key that contains a timestamp with the time of invocation, 
and an output key that contains the result from invoking the passed-in function.
HINT: You may need to research how to access information on Date objects.
*/											   
											  
function dateStamp(func) {
return function inner(...args){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
  return{
    date:today,
    output:func(...args)
  }
}
}

// /*** Uncomment these to check your work! ***/
const stampedMultBy2 = dateStamp(n => n * 2);
console.log(stampedMultBy2(4)); // => should log { date: (today's date), output: 8 }
console.log(stampedMultBy2(6)); // => should log { date: (today's date), output: 12 }
											   
											   
											   
/*Challenge 15
Create a function roulette that accepts a number (let us call it n), and returns a function. The returned function will take no arguments, 
and will return the string 'spin' the first n - 1 number of times it is invoked. On the very next invocation (the nth invocation), 
the returned function will return the string 'win'. On every invocation after that, the returned function returns the string 
'pick a number to play again'.*/
											   
function roulette(num) {
  let counter=1;
return function inner(){
  let ans;
  if(counter<num)
    {
      ans="spin";
   
    }
  else if(counter==num){
    ans="win";
    
  }
  else{
    ans="pick a number to play again"
  }
     counter++;
  return ans;
}
}											   
