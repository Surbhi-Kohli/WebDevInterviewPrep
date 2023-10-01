/*How does the reduce method achieve it using these parameters?

The value returned by the reducer function is assigned to the accumulator variable. In each iteration through the array items, 
the accumulator’s value is updated to the returned result. At the end of the iteration, the final value of the accumulator is returned as the output of the reduce function.

If an initialValue argument is passed, the first time the reducer function is executed, the accumulator will be equal
to initialValue and the currentValue will be equal to the first element stored in the array. If an initialValue is not passed,
 the accumulator will be equal to the first value of the array and currentValue will be equal to the second.*/
/**************************************************************/
let ans=[0,1,2,3,4].reduce((acc,currentVal)=>acc+currentVal,0);
console.log(ans); //10

/****************************************************************************/
/*Flatten an array 
If we have an array of arrays(1 level nested), we can use the reduce method to flatten it and create a single array without nested arrays.*/

let arr=[[0,1],2,[3,4],5,[6]];
let ans=arr.reduce((acc,currentVal)=>acc.concat(currentVal),[]);
console.log(ans); //[0,1,2,3,4,5,6]

/*We pass an empty array as the initial value so the items in the first array are concatenated with it to create a flattened array.

*** If the first array has more than one level of nested arrays, we can recursively call the reduce function to flatten and then 
    concatenate them with the final array. 
 
 ****/

let arr=[[0,1],2,[3,[4]],5,[[6]]];
function flatten(arr)
{
  return arr.reduce((acc,currentVal)=>{
   return acc.concat(Array.isArray(currentVal)?flatten(currentVal):currentVal);
  },
  []);

}
console.log(flatten(arr)); //[0, 1, 2, 3, 4, 5, 6]

/*If the current value accepted by the callback is an array, as verified using the isArray method, 
we recursively call the flattenArray function on it. If the current value is not an array, we simply 
concatenate the value with the final flattened array.*/

/*Grouping an array of objects by a property
Assume that we have an array of objects that are basically the names of countries — and we want to group each country
in the array according to their continents. We can use the reduce method for this task. Check out the code snippet below:*/

let countries=[
      {name:"Germany",continent:"Europe"},
      {name:"Brazil",continent:"South America"},
      {name:"India",continent:"Asia"},
      {name:"France",continent:"Europe"},
      {name:"South Korea",continent:"Asia"}
];

let ans=countries.reduce((acc,val)=>{
     if(!acc[val.continent])
     {
        acc[val.continent]=[];
     }
     acc[val.continent].push(val.name);
    return acc;
},{})
console.log(ans);

/*Output:
{
  Asia: ["India", "South Korea"],
  Europe: ["Germany", "France"],
  South America: ["Brazil"]
}
Explanation:Inside the callback function, we create a new key for each continent that is not in the groupedCountries map and assign an 
empty array as its value. Then we push each country object to the array stored by their respective continents.
*/

/*************************************************************************************************************************************/
//Specifying count of occurence of each element in the array
let names=["surbhi","nagraj","harshu","harshu","surbhi","surbhi"];

let ans=names.reduce((acc,currentVal)=>{
  acc[currentVal]=acc[currentVal]+1||1;
  return acc;
},{});
console.log(ans);
/*Output:
{
  harshu: 2,
  nagraj: 1,
  surbhi: 3
}
*/
/**Using reduce() in place of filter().map()
In JavaScript, we use the filter method to filter items stored in an array using a callback. We use the map method to create
a new array using the old array using the logic passed inside a callback. Sometimes we have to use these two methods, one after 
the other to create a new array with the results we filter using some conditions.

Instead of using two array methods, you can use the JavaScript array reduce method to complete the same task. It will reduce the completion 
time because now you only iterate through the array only once, not twice.

For example, let’s take the following scenario where we want to create an array of square roots of numbers greater than 30.*/

let numbers=[4,25,36,121,553,16,53,5,42,1];
let filteredArray=numbers.filter(num=>num<30).map(el=>Math.sqrt(el));
console.log(filteredArray);
//[2, 5, 4, 2.23606797749979, 1]
//The same scenario can be implemented using reduce like this:
let numbers=[4,25,36,121,553,16,53,5,42,1];
let ans=numbers.reduce((acc,val)=>{
   if(val<30)
   acc.push(Math.sqrt(val));
   return acc;
},[])
console.log(ans);

/***Program to print array such that all even elements come to left and all odd elements come to right
Example:Input-[1,2,4,3,10,8,13]
        Output-[8, 10, 4, 2, 1, 3, 13]
        
**/

let numbers=[1,2,4,3,10,8,13];
let ans=numbers.reduce((acc,val)=>{
   if(val%2==0)
   acc.unshift(val);
   else acc.push(val);
   return acc;
},[])
console.log(ans);//[8, 10, 4, 2, 1, 3, 13]

/*Program to print array elements such that all 0s come at the last of the array without changing the relative order of the rest of the numbers */

//If maintaining the relative order of non-zero elements was not a requirement
let numbers=[1,0,5,3,0,7,4,0,8];
let ans=numbers.reduce((acc,val)=>{
  val==0?acc.push(val):acc.unshift(val);
   return acc;
},[])
//Output:[8,4,7,3,5,1,0,0,0]

//Solution that maintains the relative order of non-zero elements
let numbers=[1,0,5,3,0,7,4,0,8];
let ans=numbers.reduce((acc,val)=>{
  val==0?acc.push(val):acc.unshift(val);
   return acc;
},[])
let ans2=ans.splice(ans.indexOf(0));

ans=ans.reverse().concat(ans2);
console.log(ans);//[1, 5, 3, 7, 4, 8, 0, 0, 0]
