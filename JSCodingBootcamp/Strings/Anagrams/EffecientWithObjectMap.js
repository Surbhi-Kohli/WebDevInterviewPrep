//str=str.replace(/[^\w]/g,'').toLowerCase();//Important step
function  anagram(str1,str2)
{
 let obj={}; 
 str1=str1.replace(/[^\w]/g,'').toLowerCase();
 str2=str2.replace(/[^\w]/g,'').toLowerCase();
if(str1.length!=str2.length)
 return false;

 for(let s of str1)
 {
    obj[s]=obj[s]+1||1;
 }
 for(let s of str2)
 {
   if(obj[s])
   {
   obj[s]-=1;
   }
   else 
   return false;
 }
for(let o in obj)
{
  if(obj[o]!=0)
  return false;
}
return true;
}
let stt='RAIL! Safety';
let str2='FAIRY Tales!!';
console.log(anagram(stt,str2));//true
let str1="aabac";
console.log(anagram(str1,str2));//false

