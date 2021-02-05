/*Question:1 What would be the output */
(function() {
	var fooAccount = {
		name: 'John',
		amount: 4000,
		deductAmount: function(amount) {
			this.amount -= amount;
			return 'Total amount left in account: ' + this.amount;
		}
	};
	var barAccount = {
		name: 'John',
		amount: 6000
	};
	var withdrawAmountBy = function(totalAmount) {
		return fooAccount.deductAmount.bind(barAccount, totalAmount);
	};
	console.log(withdrawAmountBy(400)());
	console.log(withdrawAmountBy(300)());
}());

/*Output:
a.Total amount left in account: 5600 Total amount left in account: 5300
b.undefined undefined
c.Total amount left in account: 3600 Total amount left in account: 3300
d.Total amount left in account: 5600 Total amount left in account: 5600

answer:Total amount left in account: 5600 Total amount left in account: 5300
*/


/* Question:2 What would be the output*/
(function() {
	var fooAccount = {
		name: 'John',
		amount: 4000,
		deductAmount: function(amount) {
			this.amount -= amount;
			return this.amount;
		}
	};
	var barAccount = {
		name: 'John',
		amount: 6000
	};
	var withdrawAmountBy = function(totalAmount) {
		return fooAccount.deductAmount.apply(barAccount, [totalAmount]);
	};
	console.log(withdrawAmountBy(400));
	console.log(withdrawAmountBy(300));
	console.log(withdrawAmountBy(200));
}());

/*Output:
a.5600 5300 5100
b.3600 3300 3100
c.5600 3300 5100
d.undefined undefined undefined
answer:5600 5300 5100
*/
/*Question 3:What would be the output*/
(function() {
	var fooAccount = {
		name: 'John',
		amount: 6000,
		deductAmount: function(amount) {
			this.amount -= amount;
			return this.amount;
		}
	};
	var barAccount = {
		name: 'John',
		amount: 4000
	};
	var withdrawAmountBy = function(totalAmount) {
		return fooAccount.deductAmount.call(barAccount, totalAmount);
	};
	console.log(withdrawAmountBy(400));
	console.log(withdrawAmountBy(300));
	console.log(withdrawAmountBy(200));
}());
/*Options:
a.5600 5300 5100
b.3600 3300 3100
c.5600 3300 5100
d.undefined undefined undefined
ans-b.3600 3300 3100*/

/*Question 4: predict the output:*/
(function greetNewCustomer() {
	console.log('Hello ' + this.name);
}.bind({
	name: 'John'
})());
/*
Options:
a.Hello John
b.Reference Error
c.Window
d.undefined
ans-a.Hello John
*/
