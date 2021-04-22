
function checkVowel(str)
{
let count=0;
const check="aeiou";
//or we can use array
//const check2=['a','e','i','o','u',"substring","abc"]
//with array thing ,we can add a substring like "abc" to also find a substring like abc
//console.log(check2.includes("substring"));//true
for(let i=0;i<str.length;i++)
{  
  if(check.includes(str[i])) //inorder to avoid str[i]=='a'||.....condition
  count++;
  //with array check2.includes(str[i])
}
return count;
}
console.log(checkVowel('umbrellaaa'));
