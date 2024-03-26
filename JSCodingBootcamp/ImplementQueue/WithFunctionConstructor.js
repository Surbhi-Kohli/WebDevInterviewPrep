function Queue(){
     let arr=[];
    arr.add =(val)=>{
     arr.push(val);
    };  
 arr.remove=()=>{
     return  arr.shift();//shift() removes the first item of an array
 };
     arr.peak=()=>{
       return arr[0];    
     };
 return arr;//returning non-primitive value-->>'this' will be a non primitive 
 //value we return here
}

let q=new Queue();
console.log(q); //[]
//console.log(q.add);
q.add(1);
q.add(2);
q.add(3);
console.log(q.peak());//1
q.add(4);
console.log(q); // [1, 2, 3, 4]
q.remove();
console.log(q);// [2, 3, 4]
q.remove();
console.log(q); //[3, 4]



