var person = {};

({ name: person["username"] } = {
	username: "yomeshgupta",
	email: "team@devtools.tech",
	name: "yomesh",
});

console.log(person.username, person.name);
//yomesh undefined
