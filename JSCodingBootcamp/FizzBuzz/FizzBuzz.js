function fizzBuzz(n){
 
  for(let i=1;i<=n;i++)
  {
  if(i%15==0)  //this operation under the hood is i%5==0 && i%3==0 by the computer,so in a way we are doing i%5 and i%3 twice
  console.log("fizzbuzz");
 else if(i%5==0)
 console.log("buzz");
 else if(i%3==0)
 console.log("fizz");
 else 
 console.log(i);
  }
  }
  fizzBuzz(33);
  //Better way
  
  function fizzBuzz(n){
 let d="";
  for(let i=1;i<=n;i++)
  { d="";
  if(i%3==0)
  d+="fizz";
  if(i%5==0)
  d+="buzz";
   if(d=="")
   console.log(i);
   else 
 console.log(d);
  }
  }
  fizzBuzz(33);
