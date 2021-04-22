function selectionSort(arr)
{
  
 for(let i=0;i<n;i++)
 { let indexMin=i;
  for(let j=i+1;j<arr.length;j++)
  {
   if(arr[j]<indexMin)
     indexMin=j;
  }
   if(indexMin!=i)
   {
    let temp=arr[i];
     arr[i]=arr[indexMin];
     arr[indexMin]=temp;
   }
 }
  return arr;
}
