// --- Directions
// 1) Complete the task in weave/queue.js
// 2) Implement the 'weave' function.  Weave
// receives two queues as arguments and combines the
// contents of each into a new, third queue.
// The third queue should contain the *alterating* content
// of the two queues.  The function should handle
// queues of different lengths without inserting
// 'undefined' into the new one.
// *Do not* access the array inside of any queue, only
// use the 'add', 'remove', and 'peek' functions.
// --- Example
//    const queueOne = new Queue();
//    queueOne.add(1);
//    queueOne.add(2);
//    const queueTwo = new Queue();
//    queueTwo.add('Hi');
//    queueTwo.add('There');
//    const q = weave(queueOne, queueTwo);
//    q.remove() // 1
//    q.remove() // 'Hi'
//    q.remove() // 2
//    q.remove() // 'There'

function weave(sourceOne, sourceTwo) {
    
    let newq=new Queue();
  while(sourceOne.peek() || sourceTwo.peek())
  {
     if(sourceOne.peek())
     {
       newq.add(sourceOne.peek());
       sourceOne.remove();
     }
    
    if(sourceTwo.peek())
    {
      newq.add(sourceTwo.peek());
       sourceTwo.remove();
    }
     
  }
  
    return newq;
}
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
 peek(){
  return this.arr[0];
 }
}
let q=new Queue();
q.add(1);
q.add(2);

console.log(q);
/*
{
  arr: [1, 2]
}
*/
let q2=new Queue();
q2.add(10);
q2.add(20);
q2.add(30);
console.log(q2);
/*
{
  arr: [10, 20, 30]
}
*/
console.log(weave(q,q2));
/*
{
  arr: [1, 10, 2, 20, 30]
}
*/
