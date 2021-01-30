function compare(input) {
  return !!(input == 1 || input == 2 || input == 3);
}

console.log(compare(0));
console.log(compare(1));
console.log(compare(2));
console.log(compare(3));
console.log(compare(4));
console.log(compare([1]));
console.log(compare([2]));
console.log(compare([3]));
//output:false true true true false true true true
//Explanation:when we use == then it implicitly type cast operands.Therefore, [1] will become "1" and then 1. Similarly, for all arrays type casting will take place.
/**************************************************/
//q-2-What is the time complexity?
function findIntersection(first, second) {
  const firstSet = new Set(first);

  return second.reduce((acc, current) => {
    return firstSet.has(current) ? [...acc, current] : acc;
  }, []);
}

function init() {
  const first = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const second = [1, 2, 3, 4, 5];
  console.log(findIntersection(first, second));
}
//ans-O(n^2)
/*// loops n times i.e. O(n)
return second.reduce((acc, current) => {
    // spread operator operation would be O(n) every time
	return firstSet.has(current) ? [...acc, current] : acc;
}, []);
Hence, overall time complexity would be O(n^2).

P.S. This is not the best way to find intersection and approach can be improved so please do not use this code anywhere. 
*/Code is written in a certain way to test logic
/********************************************************/

//q-3What would be the output?

const first = 6;
const second = "6";
const third = first + second;
const fourth = first - second;
const fifth = third + first * first;
const sixth = fourth + second * second;

console.log("Fifth is --", fifth, typeof fifth);
console.log("Sixth is --", sixth, typeof sixth);
/*
Options:
a.                                b.                                   c.                                       d.
Fifth is -- 1236 string              Fifth is -- 6636 string              Fifth is -- 1266 string                  Fifth is -- 6666 string
Sixth is -- 6666 string               Sixth is -- 36 number               Sixth is -- 66 number                     Sixth is -- 36 string

ans-b
*/
/****************************************/
//q-4
var x = 'global';
var y = function(){
  console.log(this.x);
}

y();
y.bind(this);
y();
new y();
//Output:global, global, undefined
/******************************************/
//q-5 What will be the width of the element?
.container {
  width: 100px;
  height: 100px;
  padding: 30px;
  border: 30px solid lightblue;
  margin: 30px;
}
//ans-220px
//box-sizing:container-box  (applied by default unless specifies as border-box)
/*************************************Important question*********************/
//Output question based on the delete operator in JavaScript
var person = "Yomesh";

var deletePerson = () => {
  delete person;
  return person;
};

console.log(deletePerson());

/*Options
a.undefined b.uncaught error c.Yomesh d.No output
ans- c.Yomesh
Explanation:We can't delete a local variable that has been declared with var/let/const.

We can only delete properties of objects. This also includes global variables which are implicit properties of the window object. As per the MDN --

The JavaScript delete operator removes a property from an object

If we change the code to the following then delete will work.

window.person = "Yomesh";

var deletePerson = () => {
  delete window.person;
  return window.person;
};

console.log(deletePerson()); // undefined
To read more -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
*/
