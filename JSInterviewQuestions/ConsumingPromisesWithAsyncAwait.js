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
