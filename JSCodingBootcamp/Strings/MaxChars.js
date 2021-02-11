/*Given a string,return a character that occurs the most in the string 
Examples:maxChar("abccccccd") === 'c'
maxChar("apple 123411111") === '1'

*/

function maxChar(str) {
    let obj={};
    for(let ch of str)
    {
        obj[ch]=obj[ch]+1||1;
    }
    let maxFreq=0;
    let charVal='';
    for(let key in obj) //for in instead of for of
    {
        if(obj[key]>maxFreq)
        {
                maxFreq=obj[key];
                 charVal=key;
        }
    }
       
    
    return charVal;
}
