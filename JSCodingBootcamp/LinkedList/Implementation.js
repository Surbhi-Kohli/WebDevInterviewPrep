class Node{
 constructor(data,next=null)
{
  this.data=data;
  this.next=next;
}

}
class LinkedList{
 constructor()
 { 
 this.head=null;
 }
 
 function insertFirst(data){
// const node=new Node(data);
 //  let nextNode=head.next;
   //this.head=node;
   //this.head.next=nextNode
  //or
  const node=new Node(data,this.head);
 }
 
 function size()
 {
 let counter=0;
 let node=this.head;
 while(node)
 {
   counter++;
   node=node.next;
 }
 return counter;
 }
 
 function getFirst(){
 return this.head;
 }
 
 function getLast(){
  if(!this.head)
  return null;
  
  let node=this.head;
  
  while(node)
  {
    if(!node.next)
    return node;
    
    node=node.next;
  }
 }

function clearAll(){
  this.head=null;
}
 
 function removeFirst(){
   if(!this.head)
   return ;
   this.head=this.head.next;
 }
 
function removeLast()
{
   if(!this.head)
   return;
   
   if(!this.head.next)
   {
     this.head=null;
     return;
   }
   let prev=this.head;
   let node=this.head.next;
   while(node.next)
   {prev=node;
   node=node.next;
   
   }
   previous.next=null;
}
}


//Usage
/*
const list=new LinkedList();
list.head=new Node(10);
*/
