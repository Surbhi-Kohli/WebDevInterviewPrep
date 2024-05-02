function employeeId() {
		console.log(typeof employeeId);
	}
 
console.log(typeof employeeId); //"function"
let abc="ncjdn";
console.log(typeof abc);// "string"
console.log(typeof undeclaredVar);//"undefined"
let nullVar=null;
console.log(typeof nullVar);//"Object"
let numberVar=11;
console.log(typeof numberVar);//"number"

/***********************************************/
var employeeId = 'abc123';

function foo() {
	employeeId();
	return;

	function employeeId() {
		console.log(typeof employeeId); //function
	}
}
foo();

/*****************************************/
//What would be the output of following code?
(function foo() {
	bar();

	function bar() {
		abc();
		console.log(typeof abc);
	}

	function abc() {
		console.log(typeof bar);
	}
}());
//output:function function
