function  repetingChars(str)
{
let obj={};

 for(let s of str)
 {
    obj[s]=obj[s]+1||1;
 }
 for(let key in obj)
 {
   if(obj[key]>1)
   return true;
 }
return false;
}
let stt='abccc bdd';
console.log(repetingChars(stt)); //true
