/*No right way*/

/* bind and this*/
let dog={
sound:'woof',
talk:function(){
console.log(this.sound);
}
}
dog.talk();
let talkFunction=dog.talk;
talkFunction();//undefined, since the 'this' would be global and there is no sound variable attached to global window
let boundFunction=talkFunction.bind(dog);//work around == tie the this of talkFunction to dog,
boundFunction()//woof

/************/
let button =document.getElementById("myNiceBtn");
button.addEventListener('click',dog.talk);//undefined , since this would be window object, instead of dog
//solution:button.addEventListener('click',dog.talk.bind(dog))

/*****/
function talk(){
console.log(this.sound);
}
let boromir={
sound:'One doesn't simply walk into a mordor'
}
let talkBoundToBoromir=talk.bind(boromir);
talkBoundToBoromir();//One doesn't simply walk into a mordor;
talk;//undefined

let boromir2={
speak:talk;
}
boromir.speak();//One doesn't simply walk into a mordor;
/**Example *
function talk(){
console.log(this.sound);
}
let boromir={
blabber:talk,
sound:'One doesn't simply walk into a mordor'
}
let gollum={
jabber:boromir.blabber,
sound:'My precious....'
}
gollum.jabber()//My precious....

/**Episode 3: Prototypes basics*/
/*prototype=delegate for ur task*/
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
//Prototype chain
let PrarieDog={
 howl:function(){
     console.log(this.sound.toUpperCase())
 }
}
Object.setProtoTypeOf(prarieDog,dog);//Prototype chain
prarieDog.howl()//Woof
//While classes create copy of their parent properties, prototypes delegate the property from their parent
animal.talk=function(){// we updated the value of talk in animal,which is a prototype for dog, and now dog.talk changes
 //*so this demonstrates that we did not create copy of parent property*
console.log('I am a little teapot');
}
dog.talk()//I am a little teapot
//setPrototypeOf is not used in real use case, we mostly use Object.create, to create an object and its prototype



/*Episode4 : the "new" keyword*/
/*We will discuss the usage of new keyword, when applied to functions*/ 
function Person(saying)
{
  this.saying==saying;
}
Person.prototype.talk=function(){
console.log('I say ',this.saying);
}
var crockford=new Person('SEMICOLONS !!!!!!');
crockford.talk();
//1.new creates a new empty objects
//2.its going to check prototype property of Person and gonna set new object's prototype as that prototype.
//3.the Person constructor function will be called(executed) with 'this' set to the newly created object.
//4.Returns the new object 

//Rebuilding new
function newOur(constructor){
var obj={};
Object.setPrototypeOf(obj,constructor.prototype);
//es6-> var argsArray=Array.from(arguments);
 //arguments is not an array
var argsArray = Array.prototype.slice.apply(arguments)
constructor.apply(obj,argsArray.slice(1));//['Semicolons!!']
return constructor.apply(obj,argsArray.slice(1))||obj;
//we would either return the new object or the non primitive value returned by  constructor, in case the constructor returns it
/*
consider this implementation of Person:
function Person(saying){
this.saying=saying;
return {dumbObject:true}
}

*/
}
var crockford1=newOur(Person,'Semicolons!!!');
crockford1.talk();
//whenever a function constructor is called to create an object,it has a prototype property
//If the constructor returns non-primitive object then new will
//not return the newly created object




/*********************************Episode5 __proto__ vs prototype*****************/
let cat={breed:'munchkin'}
let myCat={name:'fluffykins'}
Object.setPrototypeOf(myCat,cat);
myCat.breed//munchkin
/*Question -> When we try accessing breed of myCat,how does it know that it can access some property that it does not directly have ie,what makes the lookup
  myCat.breed possible ?
  Ans-__proto__ -->there is a property on myCat that is __proto__ "WHICH HAS A REFERENCE TO THE SAME OBJECT cat-->IMPLIES NO INSTANCE IS CREATED ".SO
  We can say that __proto__ is a refernce to the object we used while setting prototype.
  THE ABOVE BEHAVIOUR IS CALLED DELEGATION*/
/*When we do Object.setPrototypeOf,the 2nd arg will be __proto__ 
to 1st*/
cat.tailLength=15
myCat.__proto__//cat{breed:'munchkin',tailLength:15};
console.log(myCat.tailLength)//15

///talking about prototype property
function Dog(){}
Dog.prototype.breed="Bulldog"
let MyDoggie=new Dog();
MyDoggie.breed//Bulldog

//prototypes only exists on functions just to cater to the case where ur function is a function constructor and u want to create objects 
//using that  object.
MyDoggie.__proto__//{breed:'Bulldog'}
function Giraffe(){}
console.log(Giraffe.prototype); //{} empty object
let koala={}
console.log(koala.prototype);//undefined
console.log(koala.__proto__===Object.prototype) //true
//thats because the global Object is actually a function which has the prototype property
//prototype property is going to be used as a prototype(delegate) if u are calling new

/**Episode 6 Using object.create()****/
/*Object.create() creates a new object with its prototype set to the passed object*/
const cat={
 makeSound:function(){
  console.log(this.sound); 
 }
}
const mark=Object.create(cat);
mark.sound='meuwwff';
mark.makeSound();//meuwff

const waffles=Object.create(cat);
waffles.sound='wrrf';
waffles.makeSound();

console.log('Is mark a cat?',cat.isPrototypeOf(mark)) //true
/*Why does the Object.create even exist---> Because Object.create is more natural to the prototype model than new.
Object.create () does creation of object and prototype setting in a single go. 
In a real life application prefer using Object.create() over setPrototype.Coz messing around with prototypes directly is a bad idea and also setPrototypeOf is bad
in terms of performance*/
/*IMPLEMENT YOUR OWN Object.create()*/
function objectCreate(proto,props){
 const obj={};
 Object.setPrototypeOf(obj,proto);
 return obj;
}
const mark2=objectCreate(cat);
cat.isPrototypeOf(mark2) //true;
//Analogy with classes
const cat={
 init:function(sound){ //init is like a constructor
  this.sound=sound;
  return this;//when we return this,we can chain objects onto init calls
 },
 makeSound:function(){
 console.log(this.sound);
 }
}
const tommy=Object.create(cat)//{__proto__{init,makeSound}}
const tom=Object.create(cat).init("woof").makeSound()//woof
