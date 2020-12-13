function reverse(str)
{
    return str.split('').reduce((ans,char)=> char+ans,'');
}
reverse("abcd);


//reverse using array reverse 
function reverse(str)
{
  return str
  .split('')//convert to array
  .reverse()
  .join('')//convert back to string
}
/******************************************************/
/*****js program to check if string is palindrome or not****/
function palindrome(str) {
    let ans= str.split('').reduce((final,char)=>{
        return char+final;
    }
    ,'');
    if(ans==str)
    return true;
    
    return false;
}
//** method 2**//
function palindrome(str){
 const reversed=str.split('').reverse().join('');
    return reversed===str;
}
//** method3 **//
function palindrome(str)
{
  return  str.split('').every((char,i)=>{
     return char===str[str.length-i-1];
   })
    
}
