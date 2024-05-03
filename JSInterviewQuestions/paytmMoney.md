1.What is the output of following code:
(i)"abc".split("").reverse().join();   //"c,b,a"

EXPLANATION:
"abc".split("")--> ["a","b","c"]
The split() method divides a String into an ordered list of substrings, 
puts these substrings into an array, and returns the array. 

"abc".split("").reverse() --> ["c","b","a"]
The reverse() method reverses an array in place. The first array element becomes
the last, and the last array element becomes the first.
The reverse method transposes the elements of the calling array object in place, mutating the array, and returning a reference to the array.

"abc".split("").reverse().join(); --> "c,b,a"
//join without any passed delimiter ,joins with a comma *************Important
The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), 
separated by commas or a specified separator string. 
If the array has only one item, then that item will be returned without using the separator.

const elements = ['Fire', 'Air', 'Water'];

console.log(elements.join());
// expected output: "Fire,Air,Water"

console.log(elements.join(''));
// expected output: "FireAirWater"

console.log(elements.join('-'));
// expected output: "Fire-Air-Water"



(ii)"abc".split().reverse().join();  //abc

//EXPLANATION
"abc".split()//["abc"]; as we didn't specify any spliting criteria ,
so whole string is taken as 1 element of array

Consider following exmamples
const str = 'Hello world gud day';

const words = str.split(' ');
console.log(words[3]);
// expected output: "day"

const chars = str.split('');
console.log(chars)//["H","e","l","l","o"," ","w","o","r","l","d"," ","g","u","d"," ","d","a","y"]
console.log(chars[8]);
// expected output: "r"

const strCopy = str.split();
console.log(strCopy);
// expected output: Array ["Hello world gud day"]

"abc".split().reverse() ->["abc"];//reversing 1 element array remains same
"abc".split().reverse().join() //abc

/************************************************************************************
**************************************************/
2.What will be the output of the following code?

console.log(myFunc());
console.log(myVar);
var myVar = 10;
function myFunc() {
  return "Hello"
}
//Output:Hello undefined
/**********************************************************************************************/
3.What will be the output of the following code?

var salary = "1000$";
(function () {
  console.log("Original salary was " + salary);
  var salary = "5000$";
  console.log("My New Salary " + salary);
})();
//Output: Original salary was undefined
//My New Salary 5000$

/************************************************************************************************/
4.What is the output of the following?

var trees = ["xyz","xxxx","test","ryan","apple"];
delete trees[3];
trees.push('mango');
delete trees[5];
trees = trees.slice(1,7);
console.log(trees.length);//5
EXPLANATION:

var trees = ["xyz","xxxx","test","ryan","apple"];
delete trees[3];
console.log(trees);//["xyz","xxxx",undefined,"ryan","apple"];

trees.push('mango');
console.log(trees);//["xyz","xxxx",undefined,"ryan","apple","mango"]

delete trees[5];
console.log(trees);//["xyz","xxxx",undefined,"ryan","apple",undefined]


trees = trees.slice(1,7);
//The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) 
//where start and end represent the index of items in that array. The original array will not be modified.

console.log(trees); //["xxxx", "test", undefined, "apple", undefined]
console.log(trees.length); //5

/*******************************************************************************
****************************/
5.What would be the output of following code:

var obj = {
    car: {
      type: "sedan"
    },
    print: function() {
        var that = this;
        (function() {
            console.log("this : ", this.car.type);//****
            console.log("that : ", that.car.type);
        }());
    }
};
obj.print();
//Output:Uncaught TypeError: cannot read property 'type' of undefined coz of ***ed line ,we get error and the execution stops there.
 The 'this' inside IIFE is Window object and there is no car key related to window object,so We cant read type on undefined
 
 /******************************************************************************************************/
 6.What would be the output of following code:

var obj = {
    car: {
      type: "sedan"
    },
    print: function() {
        var that = this;
        (function() {
            console.log("that : ", that.car.type);
            console.log("this : ", this.car.type);//****
        }());
    }
};
obj.print();
//Output:
that:sedan
Uncaught TypeError: cannot read property 'type' of undefined
//coz of ***ed line ,we get error and the execution stops there.
 The 'this' inside IIFE is Window object and there is no car key related to window object,so We cant read type on undefined
 
/************************************************************************************************************/
7.What is the ouput of following code:
[1,2,3,4,5].filter( num => num%2 == 0).map( num => num * num).reduce( (a,b) => a * b, 0)
Output:0

/**************************************************************************************************/
8.In order to prevent user from typing in input box, which event handler code will achieve this?
a.function handler(evt) { evt.preventDefault(); }
b.function handler(evt) { evt.stopPropagation(); }
c.function handler(evt) { evt.stopImmediatePropagation(); }
d.function handler(evt) { return false; }
e.function handler(evt) { return null; }

ans-a  .function handler(evt) { evt.preventDefault(); 

/*******************************************************************************************************/

9.In order to prevent user from typing in input box, which of the following events can be used ?
 a.keyup b.keydown c.keypress d.All of these
 
 ans- b,c
 
 /***********************************************************************************************************/
 
10.The following code is run in web browser. Which of the following executions will print "mango":

var fruit = {
    name: "mango",
    printName: function() {
        console.log(this.name);
    }
}
var func = fruit.printName;

a- fruit.printName()  b- func();  c- func.bind(fruit); func(); d- func.call(window.fruit); e- func.call(fruit);

ans- a,d,e

//EXPLANANTION:
c does not work ,that because when we use bind on a function ,returns a function bound to the object passed as parameter  so
we need to do something like let boundFunc=func.bind(fruit); boundFunc(), to get the required output using bind

/*******************************************************************************************************************/

11.Which of all of the following will print the numbers 0, 1, 2:

a) for (var i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log(i);
    }, 0);
   }
   
b) for (let i = 0; i < 3; i++) {
    setTimeout(() => {
     console.log(i);
    }, 0);
  }
c)  for (const i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}

d) for (var i = 0; i < 3; i++) {
  setTimeout((i) => {
      console.log(i);
    }, 0, i);
}

e) for (var i = 0; i < 3; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i);
    }, 0);
  })(i);
}

ans - b,d,e
/***************************************************************************************************************/
12. Predict the output
var bar=true;
console.log(bar+0);  //1
console.log(bar+"xyz");  //truexyz
console.log(bar+true);    //2
console.log(bar+false);    //1

/*****************************************************************************************************************/
13.var x={foo:1};

   var output=(function(){
     delete x.foo;
    return x.foo;
   })();

console.log(output);//undefined

The JavaScript delete operator removes a property from an object; 
On successful deletion, it will return true, else false will be returned.


const Employee = {
  firstname: 'John',
  lastname: 'Doe'
};

console.log(Employee.firstname);
// expected output: "John"

delete Employee.firstname;

console.log(Employee.firstname);
// expected output: undefined


/*****************************************************************************************************************/
Programming Question -(To be coded in js)

1.You are given two strings ‘X’ and ‘Y’, each containing at most 1,000 characters. 
Write a program that can determine whether the characters in the first string ‘X’ can be rearranged to form the second string ‘Y’.
The output should be "yes" if this is possible and "no" if not.
// Read only region start
function isPermutation(input1,input2) {
    // Read only region end
    // Input parameters are :
        // input1 As String eg:- "abc"
        // input2 As String eg:- "abc"

    // Expected return type  :
        // output1 As String eg:- "abc"
    // Write code here...
  let sort1= input1.split('').sort().join();
  let sort2=input2.split('').sort().join();
  if(sort1==sort2)
  return "yes";
  return "no";
   // throw "UnsupportedException isPermutation(input1,input2)";
}

2.Write a function to find all the words in a string which are palindrome.
input1: this is level 71
         16 
Output: 1  (level is palindrome)

Input 2:hello world 
        11
        
        
        function checkPalindrome(str)
{
   let e=str.length-1;
   let s=0;
   while(s<e)
   {
   if(str[s]!=str[e])
   {
      return 0;
   }
   s++;
   e--
   }
   return 1;
}
function countPalindromes(input1,input2) {
    // Read only region end
    // Input parameters are :
        // input1 As String eg:- "abc"
        // input2 As Number eg:- 23

    // Expected return type  :
        // output1 As Number eg:- 23
    // Write code here...
    if(!input1.length )
    throw "UnsupportedException countPalindromes(input1,input2)";
    let count=0;
    let arr=input1.split(' ');
   
    for(let i=0;i<arr.length;i++)
    {
      
          
          if(checkPalindrome(arr[i]))
           { 
               count++;
           }

          
       }
    
    return count;
   
}
console.log(countPalindromes("this is level 71",16));//1
//Both the above programs pass all test cases that were provided


