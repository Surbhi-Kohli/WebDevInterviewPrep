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
                                                                                   
                                                                                     
