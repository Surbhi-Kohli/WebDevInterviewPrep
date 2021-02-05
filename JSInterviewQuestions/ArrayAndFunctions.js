/****Question1 ******/
 What would be the output of following code?
(function(){
	var animal = ['cow','horse'];
		animal.push('cat');
		animal.unshift('dog','rat','goat');
		console.log(animal);
})();
//a.[ 'dog', 'rat', 'goat', 'cow', 'horse', 'cat' ]
//b.[ 'cow', 'horse', 'cat', 'dog', 'rat', 'goat' ]
//c.Type Error
//d.undefined
ans-a
/********Question 2***************/
What would be the output of following code?
(function() {
	var array = new Array('100');
	console.log(array);
	console.log(array.length);
}());
/*Options:
a.undefined undefined
b.[undefined × 100] 100
c.["100"] 1
d.ReferenceError: array is not defined
ans=c.
*/


/*******Question 3 **********/
(function(){
	var containers = [2,0,false,"", '12', true];
	var containers = containers.filter(Boolean);
	console.log(containers);
	var containers = containers.filter(Number);
	console.log(containers);
	var containers = containers.filter(String);
	console.log(containers);
	var containers = containers.filter(Object);
	console.log(containers);		
})(); 

/* Options
a.[ 2, '12', true ] [ 2, '12', true ] [ 2, '12', true ] [ 2, '12', true ]
b. [false, true] [ 2 ] ['12'] [ ]
c. [2,0,false,"", '12', true] [2,0,false,"", '12', true] [2,0,false,"", '12', true] [2,0,false,"", '12', true]
d. [ 2, '12', true ] [ 2, '12', true, false ] [ 2, '12', true,false ] [ 2, '12', true,false]

ans-a.
Explanation:str.filter(Number);
If the array contains a number in the form of string, then the resulting array will have the number in the form of string.
In case of array:["a","b","1","2","c"], the resulting array will be ["1", "2"].

If the original array contains 0 or "0", then they will not be present in the resulting array.

If resulting array should include only integer numbers,

str.filter(Number.isInteger)
This will exclude the number in the form of string like "1", "2", etc.

For both integer and float numbers,

str.filter(Number.isFinite)
*/
 /**********************Question4**************/
 ///What would be the output of following code ?
(function() {
	var greet = 'Hello World';
	var toGreet = [].filter.call(greet, function(element, index) {
		return index > 5;
	});
	console.log(toGreet);
}());
 /*
 Options:
a.Hello World b.undefined c.World d.[ 'W', 'o', 'r', 'l', 'd' ]
ans=d
*/
