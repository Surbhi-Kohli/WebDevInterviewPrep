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
 /********************************************* Question 5 ********************************/
 //2. What would be the output of following code?
(function() {
	var array1 = [];
	var array2 = new Array(5);
	var array3 = new Array(['1',2,'3',4,5.6]);
	console.log(array1);//[]
	console.log(array2); //[undefined, undefined, undefined, undefined, undefined]
	console.log(array3);//[["1", 2, "3", 4, 5.6]]
	console.log(array3.length); //1
}());

 /********************Question 6*******************************/
 (function () {
  var array = new Array('a', 'b', 'c', 'd', 'e');
  array[10] = 'f';
  delete array[10];
  console.log(array);//["a", "b", "c", "d", "e", undefined, undefined, undefined, undefined, undefined, undefined]
  console.log(array.length); //11
}());
 
 /********************* Question 7 ***************************/
 (function(){
	var array = [1,2,3,4,5];
	console.log(array.indexOf(2)); //1
	console.log([{name: 'John'},{name : 'John'}].indexOf({name:'John'}));//-1
	console.log([[1],[2],[3],[4]].indexOf([3])); //-1
	console.log("abcdefgh".indexOf('e')); //4
})();

/*Explanation: */
/*****************Question 8***************************************************/
var arr1 = ['sue', 'kathy','tom'];
function checkValue(){
 if(!arr1.indexOf('tommy'))
 {
  console.log('Tommy not found');	
 }
 else 
 {
   console.log("tommy found");
 }
}
console.log(checkValue());//tommy found;
/*Explanation:! operator inverts the value of an expression,when we find indexOf('tommy') in arr1 , we get -1 as output,which is a truthy value
But that gets inverted by !, so the whole expression is false,and hence we dont proceed with if block
Rather,else block executes*/
/******Question 9**********************************/
var arr1 = ['sue', 'kathy','tom'];
function checkValue(){
 if(!!arr1.indexOf('tommy'))
 {
  console.log('Tommy not found');	
 }
 else 
 {
   console.log("tommy found");
 }
}
console.log(checkValue());
/**!! is used to convert the value to its boolean equivalence */
