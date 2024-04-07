function processing() {
	return new Promise((resolve, reject) => {
		resolve(1);
		reject("Failed");
		resolve(2);
		console.log("After resolve/reject");
	});
}

function init() {
	processing()
		.then((v) => console.log(v + 1))
		.catch((err) => console.log(err));
}

init();
//After resolve/reject
//2
/*Explanation:Resolve and reject doesn't work like return. Even if they are called, the function completes its execution.
Hence, console.log will be called even though resolve/reject is already invoked before and .then callback will be called after that.
Yes, resolve/reject will be called once as per order of invocation.*/

/* Question2 */
function processing() {
	return new Promise((resolve, reject) => {
		resolve(1);
		reject("Failed");
		resolve(2);
	});
}

function init() {
	processing()
		.then((v) => console.log(v + 1))
		.catch((err) => console.log(err));
}

init();
//2
//EXPLANATION: resolve or reject only execute once in the order they are called. No matter if there is a reject after resolve or vice versa it won't be executed.

/*Question 3*/
function init() {
	throw new Error("I am an error");
	return Promise.resolve(1);
}

init().then((v) => console.log(v + 1))
      .catch((err) => console.log("Error caught -- ", err));
/*What would be the output:
a.2 b.Error caught --  I am an error c.Uncaught Error: I am an error 
d.2 Error caught --  I am an error

ans-c 
EXPLANATION: errors are caught by the catch block only when there are part of the promise chain. In the current code
snippet, error thrown at line no. 2 is outside the promise chain as the chain is initiated at line no 3. If it would have been like --

function first() {
    return Promise.resolve(1);
}

function init() {
    return first()
        .then(v => {
            throw new Error("I am an error");
        })
        .catch((err) => console.log("Error caught -- ", err));
}

init();
Then output would be "Error caught -- I am an error" because we throwing an error from a function which is part of the promise chain.*/
