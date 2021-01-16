/**If u hv a library that requires the users to invoke it with a new keyword,but they dont always comply*/
function myAwesomeLibrary(config){
  if(!new.target)//this is set only when we did use new 
  {  throw new Error('Call me with the new operator');
  }
}
var awesomeObject= myAwesomeLibrary({data:'Bestest library ever'});
//Throws error

/*Another way to handle
function myAwesomeLibrary(config){
  if(!new.target)//this is set only when we did use new 
  {  return myAwesomeLibrary(config);
  }
  this.there=true
}
var awesomeObject=myAwesomeLibrary({data:'Bestest Library ever'});
console.log(awesomeObject);
