class Node{

 constructor(data){
  this.data=data;
  this.children=[];
 }
 
  function add(data){
  Node n=new Node(data);
   this.children.push(n);
 }
 function remove(data)
 {
   let ans=this.children.filter((el)=>el.data!=data)
   this.children=ans;
 }
}

class Tree{
  constructor()
  {
  this.root=null;
  }
  
  function traverseBF(fn){
   const arr=[this.root];
   while(arr.length){
     const node=arr.shift();
     //add all children
     arr.push(...node.children);
     fn(node); //or do console.log(node.data)
   }
  }
  
  function traverseDF(fn)
  {
   const arr=[this.root];
   while(arr.length){
     const node=arr.shift();//remove from front-->queue mimic
     //add all children
     arr.unshift(...node.children);
     fn(node); //or do console.log(node.data)
   }
  }
}
/* Basic Usage of tree
const node=new Node(5);
const tree=new Tree();
tree.root=node;
*/
module.exports={Tree,Node}
