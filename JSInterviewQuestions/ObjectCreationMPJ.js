/*No right way*/
let dog={
sound:'woof',
talk:function(){
console.log(this.sound);
}
}
dog.talk();
let talkFunction=dog.talk();
talkFunction();//undefined
let boundFunction=talkFunction.bind(dog);
boundFunction()//woof
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

/**Episode 3*/
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

let PrarieDog={
 howl:function(){
     console.log(this.sound.toUpperCase())
 }
}
Object.setProtoTypeOf(prarieDog,dog);//Prototype chain
prarieDog.howl()//Woof
//While classes create copy of their parent properties,prototypes delegate the property from their parent
animal.talk=function(){
console.log('I am a little teapot');
}
dog.talk()//I am a little teapot

/*Episode4*/
function Person(saying)
{
  this.saying==saying;
}
Person.prototype.talk=function(){
console.log('I say ',this.saying);
}
var crockford=new Person('SEMICOLONS !!!!!!');
crockford.talk();
//new creates a new empty objects
//its going to check prototype of Person and gonna set new object's prototype as that prototype.
//lets create our own new
function newOur(constructor){
var obj={};
Object.setPrototypeOf(obj,constructor.prototype);
//es6-var argsArray=Array.from(arguments);
var argsArray.Array.prototype.slice.apply(arguments)
constructor.apply(obj,argsArray.slice(1));
return constructor.apply(obj,argsArray.slic(1))||obj;
//we would either return the new object or the non primitive value returned by  constructor
}
var crockford1=newOur(Persone,'Semicolons!!!');
crockford1();
//whenever a function constructor is called to create an object,it has a prototype property
//If the constructor returns non-primitive object then new will
not return the newly created object
/*Episode5 __proto__ vs prototype*/
let cat={breed:'munchkin'}
let myCat={name:'fluffykins'}
Object.setPrototypeOf(myCat,cat);
myCat.breed//munchkin
/*When we do Object.setPrototypeOf,the 2nd arg will be __proto__ 
to 1st*/
cat.tailLength=15
myCat.__proto__//cat{breed:'munchkin',tailLength:15};
console.log(myCat.tailLength)//15
function Dog(){}
Dog.prototype.breed="Bulldog"
let MyDoggie=new Dog();
MyDoggie.breed//Bulldog

//prototypes only exists on functions
MyDoggie.__proto__//{breed:'Bulldog'}

