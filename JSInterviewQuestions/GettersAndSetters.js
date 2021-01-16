/* How do you implement the following code snippet? [Property Access Increment] */
const counter = {
	value: 0,
};

// What modifications would you make to the above snippet / counter object
// so that output of the following expression would be
// 1 2 3
console.log(counter.value, counter.value, counter.value);

/*Below is the implementation*/
const counter={
    _value:0,
    get value(){
        this._value++;
        return this._value
    }
}
console.log(counter.value, counter.value, counter.value);
/* Basically, the get syntax binds an object property to a function that will be called when that property is looked up. */
/*Info about getters and setterrs */

/*There are two kinds of object properties.
The first kind is data properties. We already know how to work with them. All properties that we’ve been using until now were data properties.
The second type of properties is something new. It’s accessor properties. They are essentially functions that execute on getting and setting a value, 
but look like regular properties to an external code
Accessor properties are represented by “getter” and “setter” methods. In an object literal they are denoted by get and set:.*/

let obj = {
  get propName() {
    // getter, the code executed on getting obj.propName
  },

  set propName(value) {
    // setter, the code executed on setting obj.propName = value
  }
};

/*The getter works when obj.propName is read, the setter – when it is assigned.

For instance, we have a user object with name and surname:*/

let user = {
  name: "John",
  surname: "Smith"
};
/*Now we want to add a fullName property, that should be "John Smith". Of course, we don’t want to copy-paste existing information, so we 
can implement it as an accessor:*/

let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

alert(user.fullName); // John Smith
/*
From the outside, an accessor property looks like a regular one. That’s the idea of accessor properties.
We don’t call user.fullName as a function, we read it normally: the getter runs behind the scenes.

As of now, fullName has only a getter. If we attempt to assign user.fullName=, there will be an error:*/

let user = {
  get fullName() {
    return `...`;
  }
};

user.fullName = "Test"; // Error (property has only a getter)
/*Let’s fix it by adding a setter for user.fullName:*/

let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

// set fullName is executed with the given value.
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
/*As the result, we have a “virtual” property fullName. It is readable and writable.*/

