 1.Basic method
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


2.Using Object dot notation
```
const user2={}//empty object
user2.name="Tim",
user2.score=6;
user2.increment=function(){
user2.score++;
}
```
The above methods are not scalable and efficient.


3.Using Object.create + dot notation
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

/******************************************************************/

4.Use factory functions: 
Solution1:To prevent repitition:generate objects using functions
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
/*Closure:The increment function has info of the surrounding memoryie info of label newUser*/
The previous approach of using factory functions has few problems.
   
    a.The code of increment function for all users is same, but the code
      is being stored in each object separately.Each time we create newUser object, we make space in our system's memory for all our data and functions.
      But our functions are just copies of same code(memory wastage)
    b.If you want to add new functionality to the objects, you will have to manually add to all functions


5.Make use of prototype(delegation)
We can store the common functions in an object([[Protoype]]) and have the interpreter ,check that [[Prototype]] instead of the main object 
for the function.
* Using Object.create()-make the link with Object.create
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
user1.increment()
console.log(user1.hasOwnProperty("score"));//true(Inorder to check if a property exists on an object or on its prototype,use hasOwnProperty)
console.log(user1.hasOwnProperty("increment"));//false
```
When user1.increment is called, interpreter searches for increment function in local memoryof user1.It is not there 
so it checks for [[Prototype]].
_ _proto_ _ is the getter/setter function for the [[Prototype]], although it is not recommended to set prototype via _ _proto_ _

Also note that an implicit argument("this") is passed to the increment function which actually points to the calling object(and that is how the calling object's)

<img width="408" alt="Screenshot 2022-12-17 at 1 48 22 PM" src="https://user-images.githubusercontent.com/32058209/208232832-d10fbffd-9c8c-408d-a598-13db645659f5.png">

     Prototype chain
  
   Each Object in javascript has big headline object which is the Object.It acts as a common store of functions and properties which
   can be accessed via Object.prototype .
   Notice that user1 does not have any "hasOwnProperty" function defined on it.Neither does its immediate prototype , which is userFunctionStore has that.
  So we check in the [[Prototype]] of userFunctionStore which is   the main Object.prototype, which is common for all JS objects has that .The main Object.prototype     has its own [[Prototype]] value which is set to null.
  
           Using Object.setPrototype

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
If you care about performance you should avoid setting the [[Prototype]] of an object. Instead, create a new object with the desired [[Prototype]] using Object.create()Coz messing around with prototypes directly is a bad idea .In short it looks like using Object.create is much faster than Object.setPrototypeOf when used at extremely larger scale.

6.Object creation via new keyword
The new keyword is doing all the steps of object.create behind the scenes
When we call a function with ew keyword ,2 things are automated.
1Creates a new object
2Returns a new object.

```
const user1=new userCreater("Eva",9);
const user2=new userCreater("Tim",5);

```
there are 2 things we need to figure out:
1.How should we refer to the auto-created object.-With new, the automatically created object is given the label "this"
2.Where would be our single store for common functions(eg increment)
Example code showing how "new" automates a lot of manual work


function userCreater(name,score){
 ~~const newUser=Object.create(functionStore)~~
 ~~newUser~~ this.name=name;
 ~~newUser~~ this.score=score;
 ~~return newUser~~
}


Important Prelude
Functions are both objects and functions in JS
consider the following example:

```
function multiplyBy2(num){
return num*2;
}
multiplyBy2.storeId=5
multiplyBy2(3);//6
multiplyBy2.storeId//5
multiplyBy2.prototype//{}
We can use the fact that all functions have a default property 'prototype' on their object version-to replace our function store object
__proto__ vs prototype
The objects that you create have a __proto__ property which is a getter/setter for
the object's [[Prototype]] although it is not recommended
to set prototype via __proto__.  (* people use __proto__ to refer [[Prototype]])

Whereas _prototype_ is a property available on all functions as well as the global "Object".Thats because the global Object 
is actually a function which has the _prototype_ property.
_prototype_ only exists on functions just to cater to the case where ur function is a function constructor and u want to create objects 
using that function.
Consider the following code

```
let cat={breed:'munchkin'}
let myCat={name:'fluffykins'}
Object.setPrototypeOf(myCat,cat);
cat.tailLength=15
myCat.__proto__//cat{breed:'munchkin',tailLength:15};
console.log(myCat.tailLength)//15
```

