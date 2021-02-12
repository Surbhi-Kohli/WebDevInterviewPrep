function Queue {
     this.arr=[];
    this.addVal= add(val){
     this.arr.push(val);
    };
 this.removeVal= remove(){
     return  this.arr.shift();
 };
 
}

let q=new Queue();
q.add(1);
q.add(2);
q.add(3);
q.add(4);
console.log(q);
q.remove();
console.log(q);
q.remove();
console.log(q);
