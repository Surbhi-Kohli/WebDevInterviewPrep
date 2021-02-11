function chunk(array,size){

  const chunked=[];
  let index=0;
  while(index<array.length){
  chunked.push(array.slice(index,index+size)); //second param is the index which is excluded
  index+=size;
  }
  return chunked;
  
  }
