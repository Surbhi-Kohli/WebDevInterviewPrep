
function validate(node,min=null,max=null)
{
  if(max!=null && node.data>max)
  {
    return false; 
  }
  if(min!=null&& node.data<min){
   return false; 
  }
  
  if(node.left && !validate(node.left,min,node.data))
  {
   return false; 
  }
  if(node.right && !validate(node.right,node.data,max))
  {
   return false; 
  }
  return true;
  
}
//Do level order traversal and keep pushing same level things in array..eventually check if 
//that array is sorted or not  -O(n) where n=nodes in the tree
