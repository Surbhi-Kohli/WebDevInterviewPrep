/*
Non-promisified callback version of geolocation API:
*/
navigator.geolocation.getCurrentPosition(position=>console.log(position),
                                         err=>console.log(err));
                                         
/*
Promisified Version
*/

const promisifiedGeolocation=function(){
return new Promise((resolve,reject)=>{
     navigator.geolocation.getCurrentPosition(position=>resolve(position),
                                              err=>reject(err));
})
}
/*The above function can be further simplified*/
const promisifiedGeolocation=function(){
return new Promise((resolve,reject)=>{
     navigator.geolocation.getCurrentPosition(resolve,reject);
})
}
/*Consuming the above promisified function  */
const whereAmI=function(){
   promisifiedGeolocation()
   .then(pos=>{
       const {latitude:lat,longitude:lng}=pos.coords;
       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
   })
   .then(res=>{
     console.log(res);
   })
}
