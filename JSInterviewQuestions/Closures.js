1. /*Predict the Output */                                                          |2. /*Predict the Output */  
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
/* to a(has a reference to a)*/                                                     |  variable a, so as it gets updated in its parent, the logged value is 100 */

_______________________________________________________________________________________________________________________________________________________________________

/*3. Predict the output */                                                         |/4. Predict the output */
var a=10;                                                                          | function z(){
function x(){                                                                      |  var b=900;
  function y(){                                                                    |   function x(){
    console.log(a);                                                                |      var a=7;
  }                                                                                |       function y(){
  return y;                                                                        |         console.log(a);
}                                                                                  |          console.log(b);
a=11;                                                                              |       }
var b=x();                                                                         |  a=100; 
console.log(b());                                                                  |  y();
/* Output: 11,As y encloses its lexical env,but its immediate parent doesnt */     |  }
have a variable 'a', so it looks for grand arent,ie Window object here*/           |  x();
/*  in this case*/                                                                 |  }
/*                                                                                 | z();
