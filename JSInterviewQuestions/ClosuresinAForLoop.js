/*********************************************** AMBIGUOUS BEHAVIOUR OF CLOSURES IN A LOOP **********************************************************************/

1.Predict the output:                                                                  |   2.Predict the output:
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
                                                                                       |
a.My value: 3   b.My value: 0    c.Reference Error  d.My value:undefined               |a. My value: 3    b.My value: 0     c.Reference Error d.My value:undefined
  My value: 3     My value: 1                        My value:undefined                |   My value: 3      My value: 1                          My value:undefined
  My value: 3     My value: 2                        My value:undefined                |   My value: 3      My value: 1                          My value:undefined
                                                                                       |
ans-a                                                                                  |ans-b
                                                                                       |   
EXPLANATION:because Funcs() is bound to outer-scope variable i which is                | EXPLANATION:We passed variable i as a parameter, instead of using it directly.
changed in each loop so after loop completes                                           | As we know if we pass a parameter function makes its own local copy of the variable
it has value  3 (var declaration), that is the reason it is printing 3 each time.      |(if it is not object type which pass by reference).So each time function has its 
                                                                                       | own local copy of variable which is updated by loop iteration
                                                                                       |
_____________________________________________________________________________________________________________________________________________________________________________


3.var array = [1, 2, 3, 4, 5]
for(var i = 0; i < array.length; i++) {
  setTimeout(() => {
    console.log(array[i])
  }, 1000);
}
