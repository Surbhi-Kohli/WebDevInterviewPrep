class Queue {
 constructor(){
     this.arr=[];
 }   
  add(val){
     this.arr.push(val);
 }
  remove(){
     return  this.arr.shift();
 }
 
}

let q=new Queue();
q.add(1);
q.add(2);
q.add(3);
q.add(4);
console.log(q); 
/*
{
  arr: [1, 2, 3, 4]
}
*/

q.remove();
console.log(q);
/*
{
  arr: [2, 3, 4]
}

*/

q.remove();
console.log(q);
/*
{
  arr: [3, 4]
}

*/
