/********************************************  Basic Object Destructuring    ****************************************************/

const user = {
    id: 42,
    is_verified: true
};

const {ID, isVerified} = user;

console.log(ID); // 42
console.log(isVerified); // true



/***********************************************  Assignment without declaration  **********************************************/

//A variable can be assigned its value with destructuring separate from its declaration.
let a, b;
({a, b} = {a: 1, b: 2});

/*
Notes: The parentheses ( ... ) around the assignment statement are required when using object literal destructuring assignment without a declaration.
{a, b} = {a: 1, b: 2} is not valid stand-alone syntax, as the {a, b} on the left-hand side is considered a block and not an object literal.
However, ({a, b} = {a: 1, b: 2}) is valid, as is const {a, b} = {a: 1, b: 2}
Your ( ... ) expression needs to be preceded by a semicolon or it may be used to execute a function on the previous line.
*/



/********************************************  Assigning to new variable names *******************************************************/
//A property can be unpacked from an object and assigned to a variable with a different name than the object property.

const o = {p: 42, q: true};
const {p: foo, q: bar} = o;  //p will be called foo (p is assigned a new name of foo and q is assigned a new name of bar

console.log(foo); // 42
console.log(bar); // true


/*****************************************   Default values    *************************************************************/
//A variable can be assigned a default, in the case that the value unpacked from the object is undefined.

const {a = 10, b = 5} = {a: 3};

console.log(a); // 3
console.log(b); // 5



/******************************    Assigning to new variables names and providing default values  ***************************************/
// A property can be both
// Unpacked from an object and assigned to a variable with a different name.
// Assigned a default value in case the unpacked value is undefined.
const {a: aa = 10, b: bb = 5} = {a: 3};

console.log(aa); // 3
console.log(bb); // 5

/***********************   Assigning a new variable name and assignment without declaration*********************************************/

var person = {};
 //name is destructured from the right hand side object and is given a new name person["username"]
({ name: person["username"] } = {
	username: "yomeshgupta",
	email: "team@devtools.tech",
	name: "yomesh",
});

console.log(person.username, person.name);
//yomesh undefined
