/****Question 0--V Important---doubt?????****/
var employeeId = 'abc123';

function foo() {
	employeeId = '123bcd';
	return;

	function employeeId() {}
}
foo();
console.log(employeeId);
/*Options a.undefined b.'123bcd' c.'abc123' d.ReferenceError: employeeId is not defined

ans-c.'abc123'

Explanation:the function employeeId gets hoisted inside foo and assignment of '123bcd' to employeeId doesn't happen as employeeId is considered
a function; and control returns   */




/***1. Question**/
console.log(employeeId);

/*Options:a.Some Value b.Undefined c.Type Error d.ReferenceError: employeeId is not defined
Answer
ReferenceError: employeeId is not defined**/

/****Question 2****/
var employeeId = '1234abe';
(function(){
	console.log(employeeId);
	var employeeId = '122345';
})();
/*options:a.'122345' b.undefined c.Type Error d.ReferenceError: employeeId is not defined
ans-b.undefined
*/

/***Question 3**/
var employeeId = '1234abe';
(function() {
	console.log(employeeId);
	var employeeId = '122345';
	(function() {
		var employeeId = 'abc1234';
	}());
}());

/*Options: a.'122345' b.undefined c.'1234abe' d.ReferenceError: employeeId is not defined
ans-undefined*/

/**Question 4***/
(function() {
	console.log(typeof displayFunc);
	var displayFunc = function(){
		console.log("Hi I am inside displayFunc");
	}
}());
/*options:a.undefined b.function c.'Hi I am inside displayFunc' d.ReferenceError: displayFunc is not defined
ans-a.undefined*/
