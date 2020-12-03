const whereAmI= async function(country){
 let res= await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
 console.log(res);
}
whereAmI("Portugal");
console.log('FIRST');
Output:FIRST
      "Ouput from promise"//console.log(res)
/* async-await is syntactic sugar over then() method.The above code can be written in promise form as follows */

const whereAmI= async function(country){
 fetch(`https://restcountries.eu/rest/v2/name/${country}`)
 .then(res=>console.log(res));
 console.log(res);
}
whereAmI("Portugal");
console.log('FIRST');


const whereAmI2=async function(country){
 
 let res= await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
 console.log(res);
 const data=await res.json();
 console.log(data);
 console.log(data[0]);
}

/*  Chaining promises with async await*/
function abc2(seconds){
return new Promise((resolve)=>{
setTimeout(resolve,seconds*1000);
 });
}

const whereAmI2 = async function(country){
 let res= await abc2(5);
 console.log("hey after 5 seconds");
 console.log("next in line");
 await abc2(4);
 console.log("hey after approx 10 seconds")

}
whereAmI2();
console.log("First Me");
//Output:
// First Me
// hey after 5 seconds
// next in line
/* All lines post await are like chained then() blocks whether they inturn await promises or not  */
// hey after approx 10 seconds
