/*  An issue with Promises is their implicit conversion of values returned in both the .then() and .catch() methods.
As an example, the following two Promises will log the exact same value:  */

const implicit = new Promise((resolve) => resolve("my value"))
        .then((value) => value);
    
    const explicit = new Promise((resolve) => resolve("my value"))
        .then((value) => Promise.resolve(value));
    
    implicit.then(console.log);
    explicit.then(console.log);
    
    
    /*In the implicit example, the value returned within the .then() callback is automatically wrapped in a Promise.resolve for you.
    The same is true when returning values from .catch() methods. 
    Any value returned from a .catch() function will implicitly get wrapped in a Promise.resolve wrapper:*/
    const implicit = new Promise((resolve, reject) => reject(new Error("my error")))
        .catch((error) => error.message);
    
    const explicit = new Promise((resolve, reject) => reject(new Error("my error")))
        .catch((error) => Promise.resolve(error.message));
    
    implicit.then(console.log);
    explicit.then(console.log);
    /*While this might be considered helpful for some developers, it might lead to more confusion. This conversion also overloads the .then() and .catch() 
    methods to have multiple responsibilities. If you want to synchronously map a prior result to a new value, you use .then().
    If you want to use a prior result and perform another asynchronous operation, you use .then(). If you want to handle an error and map it to a 
    different error message, you use .catch(). If you want to handle an error and resolve with a default value to keep processing your Promise chain, you use .catch().

This combination of responsibilities drastically hurts code readability. Take the following example code:*/
 fetch("/api/endpoint")
    .then(() => ...)
    .catch(() => ...)
    .then(() => ...)
    .then(() => ...)
    .catch(() => ...)
