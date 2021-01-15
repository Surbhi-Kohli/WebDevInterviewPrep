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

/********************************************************************************/
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

	return person;
}

var yomesh = new Person('Yomesh');
console.log(yomesh);
/*a.false b.{"name":"Ajay"} c.{"name":"Prithvi"} d.undefined e.{"name":"Yomesh"}

ans-e
Explanation:Returning a primitive value explicitly is equivalent to returning the original this.Here variable assignment takes precedence over
function declaration,so final value of person variable is {name:'Ajay'}*/
