/*******************Question 1********************/
/*What would be the output of following code?*/

var arrA = [0,1,2,3,4,5];
var arrB = arrA;
arrB[0]=42;
console.log(arrA)
/*Ans-The output will be [42,1,2,3,4,5].

Arrays are object in JavaScript and they are passed and assigned by reference. This is why both arrA and arrB point to the same array [0,1,2,3,4,5].
That's why changing the first element of the arrB will also modify arrA: it's the same array in the memory.
*/

/************Question 2 *********************************/
var arrA = [0,1,2,3,4,5];
var arrB = arrA.slice();
arrB[0]=42;
console.log(arrA)
/*The output will be [0,1,2,3,4,5].
The slice function copies all the elements of the array returning the new array.
That's why arrA and arrB reference two completely different arrays*/

/***************Question 3******************************/
//What would be the output of following code?
var arrA = [{prop1: "value of array A!!"},  {someProp: "also value of array A!"}, 3,4,5];
var arrB = arrA;
arrB[0].prop1=42;
console.log(arrA);
/*
The output will be [{prop1: 42}, {someProp: "also value of array A!"}, 3,4,5].
Arrays are object in JS, so both varaibles arrA and arrB point to the same array. Changing arrB[0] is the same as changing arrA[0]*/

/*********************************************************Question 4*************************************************************/
var arrA = [{prop1: "value of array A!!"}, {someProp: "also value of array A!"},3,4,5];
var arrB = arrA.slice();
arrB[0].prop1=42;
arrB[3] = 20;
console.log(arrA);

/*The output will be [{prop1: 42}, {someProp: "also value of array A!"}, 3,4,5].

The slice function copies all the elements of the array returning the new array. However, it doesn't do deep copying. Instead
it does shallow copying. You can imagine slice implemented like this:*/

function slice(arr) {
   var result = [];
   for (i = 0; i< arr.length; i++) {
       result.push(arr[i]);
   }
   return result; 
}
/*
Look at the line with result.push(arr[i]). If arr[i] happens to be a number or string,
it will be passed by value, in other words, copied. If arr[i] is an object, it will be passed by reference.

In case of our array arr[0] is an object {prop1: "value of array A!!"}. Only the reference to this object will be copied. 
This effectively means that arrays arrA and arrB share first two elements.

This is why changing the property of arrB[0] in arrB will also change the arrA[0].*/

/**************************************************************Question 5***************************************************/
var trees = ["redwood", "bay", "cedar", "oak", "maple"];
var newTrees=trees;
trees=[]; //**
console.log(newTrees);
//Output: ["redwood", "bay", "cedar", "oak", "maple"];
/*Explanantion: at line ** ,we are asssigning a brand new array to trees,with new memory,so */

/************************************Question 6***************************************************************************/
let obj={"name":"Surbhi","age":10}
let obj2=obj;
obj={};
console.log(obj2);
/*Output:{"name":"Surbhi","age":10};  
Explanation:when we did obj={},we assigned a new object with new memory location,so now both obj and obj2 dont point to same memory*/
