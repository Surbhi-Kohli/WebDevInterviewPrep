/*Given an array and a chunk size,divide the array into many subarrays where each subarray is of the provided size
Examples: chunk([1,2,3,4],2)  --> [[1,2],[3,4]]  
*/
function chunk(array, size) {
    let n=array.length;
    let i=0,k=0;
    let arr=[];
    while(i<n)
    { k=0;
     let arr2=[];
         while(i<n && k<size )
         {
             arr2.push(array[i]);
             k++;
             i++;
         }
         arr.push(arr2);
    }
    return arr;
}

/*Method using js inbuilt function: */

function chunk(array,size){

  const chunked=[];
  let index=0;
  while(index<array.length){
  chunked.push(array.slice(index,index+size)); //second param is the index which is excluded
  index+=size;
  }
  return chunked;
  
  }
