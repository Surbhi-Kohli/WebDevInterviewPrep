function mul(x)
{
return  function(y)
{
   return {
      result:x*y,
      sum:function(z)
      {
      return x*y+z
      }
   }
}
}
console.log(mul(2)(3).result);//6
console.log(mul(2)(3).sum(2));//8

/*Currying is an advanced technique of working with functions. 
It’s used not only in JavaScript, but in other languages as well.

Currying is a transformation of functions that translates a function from 
callable as f(a, b, c) into callable as f(a)(b)(c).

Currying doesn’t call a function. It just transforms it.

Most implementations of currying in JavaScript are advanced, ie ,they also
keep the function callable in the multi-argument variant.*/

/** Advanced curry implementation **/
function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}
//Usage examples:

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6, still callable normally
alert( curriedSum(1)(2,3) ); // 6, currying of 1st arg
alert( curriedSum(1)(2)(3) ); // 6, full currying
//The new curry may look complicated, but it’s actually easy to understand.

//The result of curry(func) call is the wrapper curried that looks like this:
/*When we run it, there are two if execution branches:

If passed args count is the same or more than the original function has in its definition (func.length) , 
then just pass the call to it using func.apply.
Otherwise, get a partial: we don’t call func just yet. Instead, another wrapper is returned, that will re-apply curried 
providing previous arguments together with the new ones.
Then, if we call it, again, we’ll get either a new partial (if not enough arguments) or, finally, the result.*/
