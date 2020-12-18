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
