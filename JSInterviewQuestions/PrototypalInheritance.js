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
/*************************Question 7***************************************************/
//What would be the output of following code ?
function getDataFromServer(apiUrl){
    var name = "John";
	return {
		then : function(fn){
			fn(name);
		}
	}
}

getDataFromServer('www.google.com').then(function(name){
	console.log(name);
});
/*Options
a.John
b.undefined
c.Reference Error
d.fn is not defined
ans-a>John
*/
/****************Question 8**************************************/
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
/*
a.12345678 Window
b.12345678 John
c.12345678 undefined
d.undefined undefined
ans-c.12345678 undefined

/**********************Question 9**********************************/
//What would be the output of following code ?
var employeeId = 'aq123';
function Employee() {
  this.employeeId = 'bq1uy';
}
console.log(Employee.employeeId);

/*Options
a. Reference Error
b. aq123
c. bq1uy
d. undefined
Answer -undefined*/

/*************************Question 10 ********************************/
var employeeId = 'aq123';

function Employee() {
	this.employeeId = 'bq1uy';
}
console.log(new Employee().employeeId);//bq1uy
Employee.prototype.employeeId = 'kj182';
Employee.prototype.JobId = '1BJKSJ';
console.log(new Employee().JobId);//1BJKSJ
console.log(new Employee().employeeId); //bq1uy as when the object has that property,no need to check the value from prototype

/**************************Question 11**********************************************/
//What will be the output of the following code?
var Employee = {
  company: 'xyz'
}
var emp1 = Object.create(Employee);
delete emp1.company
console.log(emp1.company);

/*The code above will output `xyz` as output. Here `emp1` object got company as **prototype** property. delete operator doesn't delete prototype property.
emp1 object doesn't have company as its own property. you can test it console.log(emp1.hasOwnProperty('company')); //output : false However, we can delete 
company property directly from Employee object using 
delete Employee.company or we can also delete from emp1 object using __proto__ property delete emp1.__proto__.company.*/
/*****Question 12*****************************/
//What would be the output of following code ?
(function() {
	var objA = {
		foo: 'foo',
		bar: 'bar'
	};
	var objB = {
		foo: 'foo',
		bar: 'bar'
	};
	console.log(objA == objB);
	console.log(objA === objB);
}());
//answer:false false
/*******************Question 13 ************************/
What would be the output of following code ?
(function() {
	var objA = {
		foo: 'foo',
		bar: 'bar'
	};
	var objB = {
		foo: 'foo',
		bar: 'bar'
	};
	console.log(objA == objB);
	console.log(objA === objB);
}());//false false

/******Question 14********************/

(function() {
	var objA = Object.create({
		foo: 'foo'
	});
	var objB = Object.create(objA);
	console.log(objA.toString() == objB.toString());//true
	console.log(objA.toString() === objB.toString());//true
}());

/****************Question 15*******************/
What would be the output of following code ?
(function() {
	var objA = Object.create({
		foo: 'foo'
	});
	var objB = objA;
	objB.foo = 'bar';
	console.log(objA.foo);
	console.log(objB.foo);
}());
/*
ans-bar bar
although we create objA with its __proto__ as the passed object,later objB also references the same memory location.But then objB creates
its own property foo,thus even objA gets it as they have same memory location*/

/*******************Question 16 ************************/
//What would be the output of following code ?
(function() {
	var objA = Object.create({
		foo: 'foo'
	});
	var objB = objA;
	objB.foo = 'bar';

	delete objA.foo;
	console.log(objA.foo);
	console.log(objB.foo);
}());
/*Options:a.foo bar b.bar bar c.foo foo d.bar foo
ans-foo foo
*/

/**************Question 17 ******************/
(function() {
	var objA = {
		foo: 'foo'
	};
	var objB = objA;
	objB.foo = 'bar';

	delete objA.foo;
	console.log(objA.foo);
	console.log(objB.foo);
}());
/*Options:a.foo bar b.undefined undefined c.foo foo d.undefined bar
ans-undefined undefined*/
