https://www.freecodecamp.org/news/javascript-settimeout-how-to-set-a-timer-in-javascript-or-sleep-for-n-seconds/
//done
/*********************************************** AMBIGUOUS BEHAVIOUR OF CLOSURES IN A LOOP **********************************************************************/

/*1.Predict the output:   */                                                           |    /*2.Predict the output:*/
  var funcs = [];                                                                      |        
// let's create 3 functions                                                            |   function createMyFunction(i) {
for (var i = 0; i < 3; i++) {                                                          |       return function() {
  // and store them in funcs                                                           |          console.log("My value: " + i);
  funcs[i] = function() {                                                              |           };
    // each should log its value.                                                      |         }
    console.log("My value: " + i);                                                     |
  };                                                                                   |    for (var i = 0; i < 3; i++) {
}                                                                                      |       myFunctions[i] = createMyFunction(i);
for (var j = 0; j < 3; j++) {                                                          |      }
  // and now let's run each one to see                                                 |    for (var j = 0; j < 3; j++) {
  funcs[j]();                                                                          |       myFunctions[j](); 
}                                                                                      |     }
/*                                                                                     |
a.My value: 3   b.My value: 0    c.Reference Error  d.My value:undefined               |a. My value: 3    b.My value: 0     c.Reference Error d. My value:undefined
  My value: 3     My value: 1                        My value:undefined                |   My value: 3      My value: 1                          My value:undefined
  My value: 3     My value: 2                        My value:undefined                |   My value: 3      My value: 2                          My value:undefined
                                                                                       |
ans-a                                                                                  |ans-b
                                                                                       |   
EXPLANATION:because Funcs() is bound to outer-scope variable i which is                | EXPLANATION:We passed variable i as a parameter, instead of using it directly.
changed in each loop so after loop completes                                           | As we know if we pass a parameter function makes its own local copy of the variable
it has value  3 (var declaration), that is the reason it is printing 3 each time.      |(if it is not object type which pass by reference).So each time function has its 
                                                                                       | own local copy of variable which is updated by loop iteration*/
                                                                                       |
/*______________________________________________________________________________________________________________________________________________________________________*/

/*3.  Predict the output*/                                                             |  /*4.Predict the output */
                                                                                       |  let arr = [];
   for (let i = 0; i < 3; i++) {                                                       |   for (let i=0; i < 3; i++) {
     funcs[i] = function() {                                                           |      arr.push(() => i);
      console.log("My value: " + i);                                                   |    }
    };                                                                                 |  console.log(arr.map(x => x())); // [0,1,2]
  }                                                                                    |   
   for (var j = 0; j < 3; j++) {                                                       | /*EXPLANATION:In loops, you get a fresh binding for each iteration 
      funcs[j]();                                                                      |               if you let-declare a variable.
   }                                                                                   |
                                                                                       |
  /* a.My value:3    b.My value: 0  c.Reference Error  d.My value:undefined            |/*5.Predict the output */
 /*    My value:3      My value: 1                       My value:undefined  */        |   let arr = [];
 /*    My value:3      My value: 2                       My value:undefined  */        |    for (var i=0; i < 3; i++) {
                                                                                       |      arr.push(() => i);
 /*ans-b                                                                               |    }
 EXPLANATION :  ECMAScript 6 (ES6) introduces new let and const keywords */            |  console.log(arr.map(x => x())); // [3,3,3]
             /* that are scoped differently than var-based variables.                  | EXPLANATION : a var declaration leads to a single binding for the
                For example, in a loop with a let-based index, each iteration          |         whole loop (a const declaration works the same):
                through the loop will have a new variable i with loop scope i.e ,      |
                new lexical environment for each iteration  within the execution       |
                context of the for loop.  |
                                                                                       |
     ********   In loops, you get a fresh binding for each iteration if you            |
                let-declare a variable. The loops that allow you to do so are: for,    |
                for-in and for-of.*/                                                   |
                  
/*____________________________________________________________________________________________________________________________________________________________*/              
                                                                                           
/* 6.Predict the output */                                                             | /* 7. Predict the output */
   var array = [1, 2, 3, 4, 5]                                                         |   var array = [1, 2, 3, 4, 5]
   for(var i = 0; i < array.length; i++) {                                             |     for(let i = 0; i < array.length; i++) {
    setTimeout(() => {                                                                 |          setTimeout(() => {
    console.log(array[i])                                                              |              console.log(array[i])
  }, 1000);                                                                            |             }, 1000);
}                                                                                      |      }
/* a.1 2 3 4 5  b.undefined undefined undefined undefined undefined                    |
ans- b                                                                                 |  a. 1 2 3 4 5
EXPLANATION: as the timer for setTimeout finishes,i is 5 and its value is available    |  b. undefined undefined undefined undefined undefined
outside the loop as i is declared as a var.                                            |  c. error
Now array[5] is undefined ,hence the output                                            | ans -a
                                                                                       | EXPLANATION:In a loop with a let-based index,each iteration through the
                                                                                       |             loop will have a new variable i with loop scope.Also
                                                                                       |      as inner arrow function is enclosed in setTimeout
                                                                                       |         ,it has access to i's even when
                                                                                       |              called later
                                                                                       |
                                                                                       
 /*_______________________________________________________________________________________________*/              
               
    /*8.Predict the output */                                                           |
    var array = [1, 2, 3, 4, 5]                                                         |      var array = [1, 2, 3, 4, 5]   
for(var i = 0; i < array.length; i++) {                                                 |     for(let i = 0; i < array.length; i++) {  
  setTimeout(() => {                                                                    |          setTimeout(() => {                                                   
    console.log(array[i])                                                               |           console.log(array[i])    
  }, 0);                                                                                |          }, 0); 
}                                                                                       |       }
     //Output:undefined undefined undefined undefined undefined                         |  //Output: 1 2 3 4 5
             
