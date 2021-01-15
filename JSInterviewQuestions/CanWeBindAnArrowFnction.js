/*Question 1*/
var f = () => console.log(this);
var o = {'a': 42};
var fBound = f.bind(o);
fBound();//Window object
/*Explanation:You cannot rebind this in an arrow function. It will always be defined as the context in which it was defined. 
If you require this to be meaningful you should use a normal function.*/

/*Question 2*/
var foo = 1;
var change = () => {
    this.foo = 2;
    console.log(this.foo);
};
var obj = { foo: 3 };
var bounded = change.bind(obj);

// What would be the output of the following?
console.log(foo);
console.log(change());
console.log(foo);
console.log(obj.foo);
console.log(bounded());
  
/*a. 1 2 2 3 2   b.1 2 1 3 3  c.1 2 2 2 3  d.1 1 2 3 1 
ans-a

*/
