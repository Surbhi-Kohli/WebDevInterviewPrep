class Stack {
    constructor(){
        this.arr=[];
    }
    push(data)
    {
        this.arr.push(data);
    }
    pop(){
        this.arr.pop();
    }
    peek(){
        let len=this.arr.length;
        return this.arr[len-1];
    }
}
let st=new Stack();
st.push(2);
st.push(1);
st.push(3);

console.log(st);
/*
{
  arr: [2, 1, 3]
}
*/
st.pop();
st.pop();
console.log(st.peek());//2
