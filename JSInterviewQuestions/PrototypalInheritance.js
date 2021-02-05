let cat={breed:'munchkin'};
let myCat={name:'fluffykins'}
Object.setPrototypeOf(myCat,cat)
myCat.name;//fluffykins
myCat.breed;//munchkin

myCat.__proto__ //Object {breed:'munchkin'}
cat .tailLength=15;
myCat.__proto__ //Object {breed:'munchkin',tailLength:15} //real object,not an instance
//Delegation ---Objects delegating to other objects
/*************************************************************************************/

function Dog(name){
this.name=name;
}
Dog.prototype.breed="Bulldog"
let myDog=new Dog("Woofy");

myDog.breed;//Bulldog

/****************************************************************************************************************/
function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
  this.nationality = "English";
}
var myFather = new Person("John", "Doe", 50, "blue");
var myMother = new Person("Sally", "Rally", 48, "green");
Person.prototype.add=10
console.log(myFather.add)
/**************************************************************************************************************/
var yomesh={name:'Yomesh',profession:'Software Engineer'};
var Ajay={name:'Ajay',profession:'Software Engineer'};
var Prithvi={name:'Pritvi',profession:'Software Engineer'};
var thisRef;
//in js,any function that defines a type is referred as a constructor function
//2 unwritten rules:have 1st letter of constructor function as capital 
//: When we call the constructor function,we need to use new keyword
function Person(name,profession){
	//1.Because of new operator, a new empty object is created and assigned to "this" in the function
	//2.The function body executes and can modify "this"
	 this.name=name;
	this.profession=profession
	thisRef=this;
	//3.Implicit "this" value is returned,if no explicit non-primitive value is returned
	//return this
}
var saloni=new Person('Saloni','SE');
console.log(saloni);
console.log("Are u 2 same",saloni===thiRef);
/********************************************************************************/
/*Explicit non -primitive return */
/*Non -primitive-array,object,function */
function Person(name,profession){
	this.name=name;
	this.profession=profession;
	return{name:"Ajay"}
		
}
var p=new Person("Yomesh","SE");
console.log(p.name)//Ajay
/**Returning an array**/
function Person(name,profession){
	this.name=name;
	this.profession=profession;
	return [1,2,3]
		
}
var p=new Person("Yomesh","SE");
console.log(p.name)//undefined;
console.log(Array.isArray(p))//true
/***********************returning a function ***************************/
var thisRef;
function Person(name,profession){
	this.name=name;
	this.profession=profession;
	thisRef=this;
	return function(){
		console.log('I am amazing');
	}	
}
var p=new Person("Yomesh","SE");
console.log(thisRef===p)//false
/*************************************************************************************************************************************/	
/***************************Returning a primitive value  from constructor function *****************/
function Person(name,profession){
	this.name=name;
	this.profession=profession;
	thisRef=this;
	return 2;//Primitive value return :Implicit this
}
/***********************************************************************************/
/*Question1**/
function Person(name) {
	this.name = name;
}
Person.prototype.getName = () => {
	return this.name;
};
const yomesh = new Person('Yomesh');
console.log(yomesh.getName());
/*
a.undefined b.Value of the property name on the global object c.Yomesh d.Empty String e.Error: getName is not a function f.Window

ans-Value of the property name on the global object
EXPLANATION:the snippet above is using an arrow function for getName. Arrow functions cannot create a context and therefore
this will be the global object in non-strict mode.*/

/***Question2 ****/
function Person(name) {
	this.name = name;

	function person() {
		return {
			name: 'Prithvi'
		};
	}

	var person = {
		name: 'Ajay'
	};

	var person = false;
//when we are trying to return ,this is bound to non-primitive value ie var person={name:'Ajay'} and we wont return false
	return person;
}

var yomesh = new Person('Yomesh');
console.log(yomesh);
/*a.false b.{"name":"Ajay"} c.{"name":"Prithvi"} d.undefined e.{"name":"Yomesh"}

ans-e
Explanation:Returning a primitive value explicitly is equivalent to returning the original this.Here variable assignment takes precedence over
function declaration,so final value of person variable is {name:'Ajay'}*/
/*Question 3 */
function Person(name) {
	this.name = name;
}

Person.prototype.sayName = function() {
	console.log(this.name);
}

var yomesh = new Person('yomesh');

console.log(yomesh.sayName());
console.log(Person.prototype.sayName());
console.log(Object.getPrototypeOf(yomesh).sayName());
console.log(yomesh.__proto__.sayName());
/*Output:yomesh
undefined
undefined
undefined
EXPLANATION:in the first case this === yomesh and in rest of the cases this === Person.prototype during invocation.*/
/****Question4 ********************/
function getName1(){
	console.log(this.name);
}

Object.prototype.getName2 = () =>{
	console.log(this.name)
}

let personObj = {
	name:"Tony",
	print:getName1
}

personObj.print();
personObj.getName2();
//output:
//Tony
//""  (empty string)
//when we do personObj.getName2(),getName2 stores an arrow function,so this inside arrow function is Window Object,which has a name property with value=""

/**************Question5*********/
function getName1(){
	console.log(this.name);
}

Object.prototype.getName2 = function(){
	console.log(this.name+"hiiii")
}

let personObj = {
	name:"Tony",
	print:getName1
}

personObj.print();//Tony
personObj.getName2();// Tonyhiiii
//now Object.prototype.getName2 gets a regular function whose this depends on the calling object which is personObj here,so this.name=Tony
/***************************Question 6**************************************************/
function passWordMngr() {
	var password = '12345678';
	this.userName = 'John';
	return {
		pwd: password
	};
}
// Block End
var userInfo = passWordMngr();
console.log(userInfo.pwd);
console.log(userInfo.userName);
//Output:"12345678"
//undefined -as the returned object doesn't have the property userName
