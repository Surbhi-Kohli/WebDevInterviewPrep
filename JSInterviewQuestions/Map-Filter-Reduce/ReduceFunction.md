# What is reduce function?
Reduce function is used where u want to take all elements of an array and come up with a single value out of them.The curr is the current element 
of array over which we are iterating while acc is the accumulated final result that we build in reduce.
## Syntax:
```js
array.reduce((accumulator, currentValue, currentIndex, array) => {
  // Your logic here
  return nextAccumulatorValue;
}, initialValue);

```
Core Parameters
* accumulator: Stores the accumulated result returned from the previous iteration.  
* currentValue: The current element being processed in the array.
* currentIndex (Optional): The index of the current element.
* array (Optional): The original array being traversed.
* initialValue (Optional): The value to initialize the accumulator on the first call.
*Important*: If you omit initialValue, reduce() defaults to using the first element of the array (index 0) as the initial accumulator,
and skips directly to the second element (index 1) for its first loop execution.
## How does the reduce method achieve it using these parameters?

The value returned by the reducer function is assigned to the accumulator variable. In each iteration through the array items, 
the accumulator’s value is updated to the returned result. At the end of the iteration, the final value of the accumulator is returned as
the output of the reduce function.

If an initialValue argument is passed, the first time the reducer function is executed, the accumulator will be equal
to initialValue and the currentValue will be equal to the first element stored in the array. If an initialValue is not passed,
 the accumulator will be equal to the first value of the array and currentValue will be equal to the second.

---
## Common Use cases

### 1. Calculating sum :
The most basic use case involves adding up a list of numbers.
```js
let ans=[0,1,2,3,4].reduce((acc,currentVal)=>acc+currentVal,0);
console.log(ans); //10
```
### 2. Grouping Objects by Property

You can compile an array of objects into a grouped dictionary/object schema.
```js
const pets = [
  { name: 'Max', species: 'Dog' },
  { name: 'Luna', species: 'Cat' },
  { name: 'Bella', species: 'Dog' }
];

const groupedPets = pets.reduce((acc, pet) => {
  const species = pet.species;
  if (!acc[species]) {
    acc[species] = []; // Initialize array if missing
  }
  acc[species].push(pet.name);
  return acc;
}, {});

console.log(groupedPets);
// Output: { Dog: ['Max', 'Bella'], Cat: ['Luna'] }

```
Another example:
Assume that we have an array of objects that are basically the names of countries — and we want to group each country
in the array according to their continents. We can use the reduce method for this task. Check out the code snippet below:
```js
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
}*/
```
Explanation:Inside the callback function, we create a new key for each continent that is not in the groupedCountries map and assign an 
empty array as its value. Then we push each country object to the array stored by their respective continents.
### 3. Counting Item Occurrences
Use an empty object as the starting structure to count repeated array elements
```js
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

const fruitCounts = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});

console.log(fruitCounts);
// Output: { apple: 3, banana: 2, orange: 1 }
```
Another example:
```js
Finding count of occurence of based on a criteria:
const users=[
 {firstName:"Akshay",lastName:"Saini",age:26},
 {firstName:"Donald",lastName:"Trump",age:50},
 {firstName:"Nitin",lastName:"Gadkari",age:66},
 {firstName:"Deepika",lastName:"Padukone",age:26},
 {firstName:"Narendra",lastName:"Modi",age:66},
 {firstName:"Rajnath",lastName:"Singh",age:66},
 ]
//expected output:{26:2,50:1,66:3}
let output=users.reduce((acc,curr)=>{
 if(!acc[curr.age])
 {
 acc[curr.age]=1;
 }
 else{
 acc[curr.age]+=1;
 }
 return acc;
},{});
console.log(output)//{26:2,50:1,66:3}
```

### 4. Flatten an array 
If we have an array of arrays(1 level nested), we can use the reduce method to flatten it and create a single array without nested arrays.
```js
let arr=[[0,1],2,[3,4],5,[6]];
let ans=arr.reduce((acc,currentVal)=>acc.concat(currentVal),[]);
console.log(ans); //[0,1,2,3,4,5,6]
```
We pass an empty array as the initial value so the items in the first array are concatenated with it to create a flattened array.
**Important**: concat function concats 2 arrays and returns a new array.concat() does not change the original array.It returns a new array.

```js
let arr1 = [1, 2];
let arr2 = [3, 4];

let result = arr1.concat(arr2);

console.log(result); // [1, 2, 3, 4]
console.log(arr1);   // [1, 2]
console.log(arr2);   // [3, 4]

```
Adding a Single Value

```js
let arr = [1, 2];

let result = arr.concat(3);

console.log(result); // [1, 2, 3]
console.log(arr);    // [1, 2]
```

If the first array has more than one level of nested arrays, we can recursively call the reduce function to flatten and then 
    concatenate them with the final array. 
 
```js
let arr=[[0,1],2,[3,[4]],5,[[6]],[7,[8,9]]];
function flatten(arr)
{
  return arr.reduce((acc,currentVal)=>{
   return acc.concat(Array.isArray(currentVal)?flatten(currentVal):currentVal);
  },
  []);

}
console.log(flatten(arr)); //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

/*If the current value accepted by the callback is an array, as verified using the isArray method, 
we recursively call the flattenArray function on it. If the current value is not an array, we simply 
concatenate the value with the final flattened array.*/
```
----
## Chaining map, filter and reduce:
In JavaScript, we use the filter method to filter items stored in an array using a callback. We use the map method to create
a new array using the old array using the logic passed inside a callback. Sometimes we have to use these two methods, one after 
the other to create a new array with the results we filter using some conditions.
What if you need to get firstName of all people whose age is less than 30:
one way would be to filter and then map on that via chaining
```js
const output2=users.filter(x=>x.age<30).map(el=>el.firstName);
console.log(output2);
```
Doing the same with using just reduce:Using reduce() in place of filter().map()
Instead of using two array methods, you can use the JavaScript array reduce method to complete the same task. It will reduce the completion 
time because now you only iterate through the array only once, not twice.
```
const output3=users.reduce((acc,curr)=>{
   if(curr.age<30)
   acc.push(curr.firstName);
   return acc;
},[])
console.log(output3);
```


Another example, let’s take the following scenario where we want to create an array of square roots of numbers greater than 30.*/
```
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
```
Program to print array such that all even elements come to left and all odd elements come to right
Example:Input-[1,2,4,3,10,8,13]
        Output-[8, 10, 4, 2, 1, 3, 13]
        

```
let numbers=[1,2,4,3,10,8,13];
let ans=numbers.reduce((acc,val)=>{
   if(val%2==0)
   acc.unshift(val);
   else acc.push(val);
   return acc;
},[])
console.log(ans);//[8, 10, 4, 2, 1, 3, 13]
```
Program to print array elements such that all 0s come at the last of the array without changing the relative order of the rest of the numbers */
```
//If maintaining the relative order of non-zero elements was not a requirement
let numbers=[1,0,5,3,0,7,4,0,8];
let ans=numbers.reduce((acc,val)=>{
  val==0?acc.push(val):acc.unshift(val);
   return acc;
},[])
//Output:[8,4,7,3,5,1,0,0,0]
```

//Solution that maintains the relative order of non-zero elements
```
let numbers=[1,0,5,3,0,7,4,0,8];
let ans=numbers.reduce((acc,val)=>{
  val==0?acc.push(val):acc.unshift(val);
   return acc;
},[])
let ans2=ans.splice(ans.indexOf(0));

ans=ans.reverse().concat(ans2);
console.log(ans);//[1, 5, 3, 7, 4, 8, 0, 0, 0]
```
