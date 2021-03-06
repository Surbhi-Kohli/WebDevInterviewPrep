/*Question 1*/
var Duryodhana = new Kaurav('Duryodhana', 'Gada')
let Arjuna = new Pandav('Arjuna', 'Gandiva')
const Dronacharya = new Guru('Dronacharya')
console.log(Duryodhana);
console.log(
  Arjuna.weapon,
  window.Arjuna,
  Duryodhana.weapon,
  window.Duryodhana,
  Dronacharya.name,
  window.Dronacharya
)
/* console.log(Duryodhana)
{
  name: "Duryodhana",
  weapon: "Gada"
}
//2nd console.log()
"Gandiva", undefined, "Gada", {
  name: "Duryodhana",
  weapon: "Gada"
}, "Dronacharya", undefined 
*/
/*Question 2*/
var name = "Puneet";

function Engineer() {
	this.name = "Yomesh";
}

console.log(new Engineer().name);
Engineer.prototype.name = "Saloni";
Engineer.prototype.channel = "https://bit.ly/devtools-yt";
console.log(new Engineer().channel);
console.log(new Engineer().name);

/*A.Puneet https://bit.ly/devtools-yt  Yomesh  B.Puneet https://bit.ly/devtools-yt  Saloni  C.Yomesh https://bit.ly/devtools-yt Yomesh
D. Puneet undefined Yomesh   E.Puneet
https://bit.ly/devtools-yt
Puneet

ans-C
EXPLANATION: Final object would look like

{ name: "Yomesh", __proto__: { name: "Saloni", channel: "https://bit.ly/devtools-yt" } }
While searching for property name, first look up would be on the direct enumerable properties of the object and since that exists (this.name = "Yomesh"),
it would be printed. If no direct property is present then Prototype chain is traversed and in that case value would be Saloni. 
In case of channel property, Prototype chain is traversed and value is printed.*/

/*Question 3 Hint:Returning Non-primitive Value from a constructor*/
function parseData(data) { /* Some computation */ return data;  };

class User {
	constructor(name, ...data) {
		const parsedData = parseData(data);

		this.name = name;
		this.data = parseData;

		return parseData;
	}

	getData() {
		return this.data;
	}
}

const Yomesh = new User('Yomesh', { youtubeChannel: 'https://bit.ly/devtools-yt', shouldSubscribe: true });

// What would be the output of the following statement?
console.log(Yomesh.getData()); 

/*A.{ youtubeChannel: 'https://bit.ly/devtools-yt', shouldSubscribe: true } B.undefined C.Error D.null E.[object Object]
ans-c
EXPLANATION:Class in JavaScript is (mostly) just syntactical sugar. The underlying working is same as the constructor function. 
Since, in the code snippet we are creating an instance, using the new operator, 
but returning a non-primitive value from the constructor so implicit this will be lost and instance won't have any getData method to call.
  */

/*Question 4*/
function Person() {
	this.name = "Yomesh";
	return this;
}

var person = new Person();
console.log(person.name); // Output 1?

function Car() {
	this.name = "BMW";
	return this.name;
}

var car = new Car();
console.log(car.name); // Output 2?

function Animal() {
	var animals = [];
	animals.push("tiger");
	animals.alive = true;
	return animals;
}

var animals = new Animal();
console.log(animals.alive, Array.isArray(animals), animals[0] === "tiger"); // Output 3?

function Rocket() {
	var rocket = () => {
		console.log("I am an rocket");
	};
	this.engines = 4;
	return rocket;
}

var rocket = new Rocket();
rocket(); // Is there going to be an error? Output 4?
console.log(rocket.engines); // Output 5?

function Company() {
	this.name = "OLX";
	return {};
}

var company = new Company();
console.log(company.name); // Output 6?
/*Answer:Yomesh BMW true true true I am an rocket undefined undefined*/
/*Question 5*/
var employeeId = 'aq123';
function Employee() {
  this.employeeId = 'bq1uy';
}
console.log(Employee.employeeId);
/*
Options:
a.Reference Error
b.aq123
c.bq1uy
d.undefined
ans-d
*/
