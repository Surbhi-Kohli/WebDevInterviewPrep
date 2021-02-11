function checkVowel(str)
{

const matches=str.match(/[aeiou]/gi);
//match resturns null if no match is found
 return matches?matches.length:0

}
console.log(checkVowel('umbrellaaa'));//5
