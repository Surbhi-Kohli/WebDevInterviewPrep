
 ## 1.Basic method
 Objects store data and functions(encapsulation)

   ```
      const user1={
          name:"Will",
          score:3,
          increment:function(){
          user1.score++;
          }
        }
      user1.increment//makes the score as 4
  ```


## 2.Using Object dot notation
```
const user2={}//empty object
user2.name="Tim",
user2.score=6;
user2.increment=function(){
user2.score++;
}
```
The above 2 methods are not scalable and efficient.


## 3.Using Object.create + dot notation
Object.create gives us an empty object with prototype set to the passed argument

```
const user3=Object.create(null)//no prototype object passed here
user3.name="Eva",
user3.score=9;
user3.increment=function(){
user3.score++;
}
```
With the above ways, our code is getting repetitive,we are breaking the DRY principle.And suppose we have millions of users,this process would be
inefficient.



## 4. Solution1(Use factory functions):To prevent repitition,generate objects using functions

```
function userCreator(name,score){
const newUser={};
newUser.name=name;
newUser.score=score;
newUser.increment=function(){newUser.score++}
 return newUser;
}
const user1=userCreator("will",3);
const user2=userCreator("Tim",5);
user1.increment()//increments will's score to 4
```
*Closure:The increment function has info of the surrounding memory ie info of label newUser*

The previous approach of using factory functions has few problems.
   
a.The code of increment function for all users is same, but the code
  is being stored in each object separately.Each time we create newUser object,
  we make space in our system's memory for all our data and functions.
  But our functions are just copies of same code(memory wastage).  
  
b.If you want to add new functionality to the objects, you will have to manually add to all functions


## 4.Solution 2: Make use of prototype(delegation)  

We can store the common functions in an object( [[Protoype]] ) and have the interpreter ,check that [[Prototype]] instead of the main object 
for the function.
* Using Object.create() : make the link with Object.create

```
function userCreater(name,score){
const newUser=Object.create(userFunctionStore);//the userFunctionStore is set as the [[Prototype]] of the newly created object
newUser.name=name;
newUser.score=score;
return newUser;
}

const userFunctionStore={
  increment:function(){this.score++},
  login:function(){console.log("logged in")}
}
const user1=userCreater("Will",3);
const user2=userCreater("tim",5);
console.log(Object.getPrototypeOf(user1)); //gives info of [[Prototype]]
/*
{
  increment: function(){this.score++},
  login: function(){console.log("logged in")}
}
*/
console.log(user1.prototype);//undefined
user1.increment()
console.log(user1.hasOwnProperty("score"));//true(Inorder to check if a property exists on an object or on its prototype,use hasOwnProperty)
console.log(user1.hasOwnProperty("increment"));//false
```
When user1.increment is called, interpreter searches for increment function in local memoryof user1.It is not there 
so it checks for [[Prototype]].  

_ _ proto _ _ is the getter/setter function for the [[Prototype]], although it is not recommended to set prototype via _ _ proto _ _

Also note that an implicit argument("this") is passed to the increment function which actually points to the calling object(and that is how the calling object's)

<img width="408" alt="Screenshot 2022-12-17 at 1 48 22 PM" src="https://user-images.githubusercontent.com/32058209/208232832-d10fbffd-9c8c-408d-a598-13db645659f5.png">

  ### Prototype chain
  
   Each Object in javascript has big headline object which is the Object.It acts as a common store of functions and properties which
   can be accessed via Object.prototype .
   Notice that user1 does not have any "hasOwnProperty" function defined on it.Neither does its immediate prototype , which is userFunctionStore has that.
  So we check in the [[Prototype]] of userFunctionStore which is   the main Object.prototype, which is common for all JS objects has that .The main Object.prototype     has its own [[Prototype]] value which is set to null.
  
   ### Using Object.setPrototype

```
function talk(sound){
console.log(sound)
}
talk('woof');
function talk(){
console.log(this.sound);
}
let animal={
talk:talk
}
let cat={
sound:'meow!'
}
let dog={
 sound:'woof!'
}
Object.setPrototypeOf(cat,animal);
Object.setPrototypeOf(dog,animal);
cat.talk();//meow
dog.talk();//woof

let PrarieDog={
 howl:function(){
     console.log(this.sound.toUpperCase())
 }
}
Object.setProtoTypeOf(prarieDog,dog);//Prototype chain
prarieDog.howl()//Woof
```


Object.setPrototypeOf vs Object.create

The MDN  says in particular:
If you care about performance you should avoid setting the [[Prototype]] of an object. Instead, create a new object with the desired [[Prototype]] using Object.create() Coz messing around with prototypes directly is a bad idea .In short it looks like using Object.create is much faster than Object.setPrototypeOf when used at extremely larger scale.
### Create and invoke a new function (add1) inside increment, to understand this keyword:
```
function userCreator(name,score){
const newUser=Object.create(userFunctionStore);
newUser.name=name;
newUser.score=score;
 return newUser;
}
const userFunctionStore={
  increment:function(){
   function add1(){
   console.log(this.score);//undefined
   this.score++;
   console.log(this.score);//Nan (since we did ++ on NaN)
  }
  add1()
}
}
const user1= userCreator("Will",2);
const user2 = userCreator("Tim",5)
user1.increment()
```
What does 'this' get auto assigned to? The global 'window' object, since inner function add1 is called by increment and not by user1.
To fix this u can use call or apply 
```
function userCreator(name,score){
const newUser=Object.create(userFunctionStore);
newUser.name=name;
newUser.score=score;
 return newUser;
}
const userFunctionStore={
  increment:function(){
   function add1(){
   console.log(this.score);// 2
   this.score++;
   console.log(this.score);// 3
  }
 add1.call(this)
}
}
const user1= userCreator("Will",2);
const user2 = userCreator("Tim",5)
user1.increment()

```
### Arrow function and this
Another way would be the use of arrow function.Here in the below example ,the inner add1 function gets its this set by 
where it is lexically scoped

```
function userCreator(name,score){
const newUser=Object.create(userFunctionStore);
newUser.name=name;
newUser.score=score;
 return newUser;
}
const userFunctionStore={
  increment:function(){
   const add1=()=>{
   console.log(this.score);// 2
   this.score++;
   console.log(this.score);// 3
  }
 add1()
}
}
const user1= userCreator("Will",2);
const user2 = userCreator("Tim",5)
user1.increment()

```

## 5.Object creation via new keyword  (The most standardised way of object creation)
The new keyword is doing all the steps of object.create behind the scenes.
When we call a function with new keyword ,certain things are automated.  

1. Creates a new object.
2. Returns a new object.
3. The [[Prototype]] is set automatically.

```
const user1=new userCreater("Eva",9);
const user2=new userCreater("Tim",5);

```

there are 2 things we need to figure out:
1. How should we refer to the auto-created object.-> With new, the automatically created object is given the label "this"
2. Where would be our single store for common functions(eg increment).

   
### Example code showing how "new" automates a lot of manual work

 `function userCreater(name,score){  
 `~~const newUser=Object.create(functionStore)~~
 ~~newUser~~ this.name=name;
 ~~newUser~~ this.score=score;
 ~~return newUser~~ //it is not required to return the object, it is automatically returned because of use of 'new'
```
    }
   //userCreater.prototype//{}
   userCreater.prototype.increment=function(){ this.score++}
   const user1=new userCreater("will",3)
```

Important Prelude
Functions are both objects and functions in JS
consider the following example:

```
function multiplyBy2(num){
return num*2;
}
multiplyBy2.storeId=5
multiplyBy2(3);//6
multiplyBy2.storeId//5 -- object version of function being used 
multiplyBy2.prototype//{}
```

<img width="223" alt="Screenshot 2024-04-06 at 2 15 34 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/6158db0d-b86a-4775-b101-34d9e595f5ce">

If we use parenths with function name like multiplyBy2(), we are using function version, but if we use '.' with function name, we are using object version .
We can use the fact that all functions have a default property 'prototype' on their object version-to replace our function store object.
All functions in their object version have the "prototype" property which defaults to empty object.

So in the prototype property of the object version of userCreater function, we will store the general functions that are to be associated to all objects that 
come out of running userCreater with "new" keyword in front of them.


Final code: 

```
function userCreater(name,score){
this.name=name;
this.score=score;
}

userCreater.prototype.increment=function(){this.score++}
userCreater.prototype.login=function (){console.log("login")}

const user1=new userCreater("Eva",9);
user1.increment();
```
Here in our userCreater, there is no creating of an object inside it.No making of bond to some shared store or functions, no returning an object out,
becoz we are gonna run that function with the help of the "new" keyword which is acting as a modifier
as it alters the behaviour of the userCreater's execution context.
"new" is gonna insert stuff in it automatically for us,when we run it.  

But we do need a shared store of functions for all objects created out of userCreater.We are gonna store the shared functions in the
prototype property of our userCreater function.

 <img width="435" alt="Screenshot 2024-04-06 at 2 17 58 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/f8ca48cc-40d0-4651-9524-002250de7527"> 
 
The [[Prototype]] or __ proto __ of the new object gets linked to the prototype property
of the userCreater function.

<img width="450" alt="Screenshot 2024-04-06 at 2 24 16 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/edc8f8f2-4b80-446d-a157-32f77ce55d9a">    

Even if we update the prototype after object creation, the object's [[Prototype]] holds reference to the 'prototype' property of function.  

<img width="867" alt="Screenshot 2024-04-06 at 3 54 18 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/cd929407-244f-4532-83aa-ed01e1c1cd73">


Also if the constructor function returns non-primitive object then new will
not return the newly created object.  
  
  <img width="643" alt="Screenshot 2024-04-06 at 4 13 17 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/dea9a54a-a73a-45f7-aa0e-cbf535493f78">

Benefits of this solution
Faster to write.Often used in practice in professional code.

Problems:
95% of developers have no idea how it works.
We have to uppercase the first letter of the function so we know it requires "new" to work.
What if u run userCreater without the new keyword.Then the "this" would be the global window .By just looking at the code , we can't be sure that
we need to use the function along with the "new" keword

## _ _ proto_ _ v/s prototype v/s [[Prototype]]

The objects that you create have a _ _ proto _ _ property which is a getter/setter for
the object's [[Prototype]] although it is not recommended
to set prototype via _ _ proto _ _.  (* people use _ _ proto_ _ to refer [[Prototype]]).

The [[Prototype]] is the actual property that holds reference to the parent object's properties and hence delegation works.

Whereas _prototype_ is a property available on all functions as well as the global "Object", which will hold all the properties which child objects will refer.The [[Prototype]] points to this __prototype__ of parent.Global "Object" has __prototype__ because the global Object 
is actually a function which has the _prototype_ property.The default value of prototype is empty object ie {}.This exists so as to add properties that would be needed in [[Prototype]] of objects created via the function constructor.
_prototype_ only exists on functions just to cater to the case where ur function is a function constructor and u want to create objects 
using that function.
Consider the following code

```
//_ _proto_ _
let cat={breed:'munchkin'}
let myCat={name:'fluffykins'}
Object.setPrototypeOf(myCat,cat);
cat.tailLength=15
myCat._ _proto_ _//cat{breed:'munchkin',tailLength:15}; Better code: Object.getProtoTypeOf(myCat)
console.log(myCat.tailLength)//15

//prototype
//prototype only exists on functions just to cater to the case where ur function is a function constructor and u want to create objects 
//using that  object via new keyword.
function Dog(){}
Dog.prototype.breed="Bulldog"
let MyDoggie=new Dog();
MyDoggie.breed//Bulldog


MyDoggie.__proto__//{breed:'Bulldog'}
function Giraffe(){}
console.log(Giraffe.prototype); //{} empty object
let koala={}
console.log(koala.prototype);//undefined
console.log(koala._ _proto_ _===Object.prototype) //true
```

