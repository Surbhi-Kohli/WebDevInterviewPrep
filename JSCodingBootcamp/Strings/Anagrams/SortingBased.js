function  anagram(str1,str2)
{
 
 str1=str1.replace(/[^\w]/g,'').toLowerCase().split('').sort().join('');//sort gonna take O(nlogn)
 str2=str2.replace(/[^\w]/g,'').toLowerCase().split('').sort().join('');
if(str1==str2)
return true;
else
return false;
}
let stt='RAIL! Safety';
let str2='FAIRY Tales!!';
console.log(anagram(stt,str2));//true
let str1="aabac";
console.log(anagram(str1,str2));//false
