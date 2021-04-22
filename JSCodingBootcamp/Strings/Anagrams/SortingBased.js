/*Check to see if 2 provided strings are anagrams of each other.One string is an anagram of another if it uses the same character in the same quantity.
Only consider characters,not spaces or punctuation.Consider capital letters to be same as lower case letters.
//Examples:
anagrams('rail safety','fairy tales')//true
anagrams('RAIL Safety','fairy tales')//true
anagrams('hi there','bie there')//false

*/
//QUICK TIP:If the two strings are of unequal length,return false right away

//basic way:make character map of alpha characters. compare occurancesof chars in maps for the 2 string words (compare their lengths first so as to exit early if possible)

function  anagram(str1,str2)
{
 if(str1.length!=str2.length)
  return false;
 
 //str1.replace(/[^\w]/g,'') is to remove spaces in a string 
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
