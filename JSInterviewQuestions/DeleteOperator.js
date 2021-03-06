/* The delete operator removes a given property from an object. On successful deletion, it will return true, else false will be returned.

However, it is important to consider the following scenarios:

If the property which you are trying to delete does not exist, delete will not have any effect and will return true.
If a property with the same name exists on the object's prototype chain, then, after deletion, the object will use the property
from the prototype chain (in other words, delete only has an effect on own properties).
Any property declared with var cannot be deleted from the global scope or from a function's scope.
As such, delete cannot delete any functions in the global scope (whether this is part from a function definition or a function expression).
Functions which are part of an object (apart from the global scope) can be deleted with delete.

***Any property declared with let or const cannot be deleted from the scope within which they were defined.
Non-configurable properties cannot be removed. This includes properties of built-in objects like Math, Array, Object
and properties that are created as non-configurable with methods like Object.defineProperty() 
*/
var Employee = {};
Object.defineProperty(Employee, 'name', {configurable: false});

console.log(delete Employee.name);  // returns false

var, let, and const create non-configurable properties that cannot be deleted with the delete operator:
var nameOther = 'XYZ';

// We can access this global property using:
Object.getOwnPropertyDescriptor(window, 'nameOther');

// output: Object {value: "XYZ",
//                  writable: true,
//                  enumerable: true,
//                  configurable: false}

// Since "nameOther" is added using with the
// var keyword, it is marked as "non-configurable"

delete nameOther;   // return false
/*****Question 1 ****/
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
answer: b.undefined undefined 
*/
/************Question 2 *******/
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
/*Options:a.undefined undefined b.foo foo c.bar bar d.foo bar   */
//output: foo foo
//reason: as we created the objA with object.create, the passed object in Object.create is a prototype object
//when we do objB.foo='bar', objB gets its own property foo whose value  is 'bar' and as both objA and objB ref to same memory location,
//on deletion of their own property,the prototype still has foo property,so that gets logged

//even A gets that property
