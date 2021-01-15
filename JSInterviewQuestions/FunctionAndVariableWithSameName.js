/*Question1 */

function a(x) {
    return x * 2;
}

var a;
alert(a);
/*Output: function a(x) {
        return x * 2
      }
      
 EXPLANATION:function, if defined in a function, or the top of the global context, if outside a function. 
 And function declaration takes precedence over variable declarations (but not over variable assignment).
Function Declaration Overrides Variable Declaration When Hoisted .    
 */


/*Question2 */
function a(x) {
    return x * 2;
}

var a=10;
alert(a);//10
/*Question 3*/
function Person(name) {
	this.name = name;

	var person = {
		name: 'Ajay'
	};

	function person() {
		return {
			name: 'Prithvi'
		};
	}

	return person;
}

var yomesh = new Person('Yomesh');
console.log(yomesh);
//{"name":"Ajay"}
