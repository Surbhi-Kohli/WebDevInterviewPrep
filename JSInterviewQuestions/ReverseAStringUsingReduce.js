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

