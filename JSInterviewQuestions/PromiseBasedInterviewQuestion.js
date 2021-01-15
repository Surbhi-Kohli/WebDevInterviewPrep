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
