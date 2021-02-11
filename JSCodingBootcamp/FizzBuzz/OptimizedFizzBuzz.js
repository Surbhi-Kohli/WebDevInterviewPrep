// Operators: modulo(%),Divide(/), multiply(*)   take O(n^2) while  +,-  take O(n) where n is the size of the number under consideration

function fizzBuzz(n){
   let d="";
    let c3=0,c5=0;
    for(let i=1;i<=n;i++)
    {
      d="";
      c3++;
      c5++;
      if(c3==3)
      {
       d=d+"fizz";
       c3=0;
      }
     if(c5==5)
     {
      d=d+"buzz";
      c5=0;
     }
   if(d=="")
   console.log(i);
   else 
    console.log(d);
  }
  }
  fizzBuzz(33);
//1 2 "fizz" 4 "buzz" "fizz" 7 8 "fizz" "buzz" 11 "fizz" 13 14 "fizzbuzz" 16 17 "fizz" 19 "buzz" "fizz" 22 23 "fizz" "buzz" 26 "fizz" 28 29 "fizzbuzz" 31 32 "fizz"
  
