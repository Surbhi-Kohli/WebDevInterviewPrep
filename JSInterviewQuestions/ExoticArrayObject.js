var arr=[];
arr[null]="foo";
console.log(arr.length);//0
console.log(arr.null);//foo
console.log(arr[null]);//foo
arr[5]="meow";  
console.log(arr.length);//6
console.log(arr); //[undefined, undefined, undefined, undefined, undefined, "meow"]
