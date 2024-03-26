/*Write a program to find intersection of 2 arrays using inbuilt js functions*/


var arr1 = ['sue', 'sue', 'kathy','tom'];
  var  arr2 = ['kathy', 'kathy', 'sue'];

/* let ans=arr1.map(el=>{

  let ans2= arr2.filter(el2=>el2==el);
  if(ans2.length)
  return [...ans2]
}) 
console.log(ans)//[["sue"], ["sue"], ["kathy", "kathy"], undefined] //problem with this approach-->things that dont match have undefined at their place in output
*/

ans3=arr2.filter(el=>arr1.indexOf(el)!=-1)

console.log(ans3); //["kathy", "kathy", "sue"]  Duplicates are not handled properly

ans4=arr2.filter(el=>arr1.indexOf(el)!=-1)
.filter((el,i,a)=>a.indexOf(el)==i);
console.log(ans4); //["kathy", "sue"]  Duplicates handled


https://www.freecodecamp.org/news/javascript-array-filter-tutorial-how-to-iterate-through-elements-in-an-array/
