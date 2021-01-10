/**Question:Given a deeply nested array,create a function on array ,namely flatten,that when involed returns a flat version of original array.
The function should be defined in a way that it can be  invoked on existing & future arrays**/
/*
Input:[
1,2,3,
[4],
[5,6,[7],[8,[9,[10]]]],
11,12,13,
[14,[[[[[15,[16]]]]]]],
17,18,
[19,[20,[21,[22,[23,[24,[[[[[25]]]]]]]]]]]
]
Output:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

*/
/* Approach 1*/

function flatten()
{
const output=[];
  function processing(arr)
  {
     for(let i=0;i<arr.length;i++)
     {
       if(Array.isArray(arr[i]))
       processing(arr[i]);
       else
       output.push(arr[i]);
     }
  }
  processing(this);
  return output;
}
Array.prototype.flatten=flatten;

let nestedArray=[
1,2,3,
[4],
[5,6,[7],[8,[9,[10]]]],
11,12,13,
[14,[[[[[15,[16]]]]]]],
17,18,
[19,[20,[21,[22,[23,[24,[[[[[25]]]]]]]]]]]
]
console.log(nestedArray.flatten());
/*  Approach2*/
function flatten(){
return this.toString().split(',').map(el=>Number(el));
}
Array.prototype.flatten=flatten;

/*Explanation:The function toString() on our nested array gives the following result:
"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25"
i.e a stringified and non nested version of the nested array.That can further be converted to the array*/

/*Approach 3:Using a stack
function flatten(input) {
  const stack = [...input];
  const res = [];
  while(stack.length) {
    // pop value from stack
    const next = stack.pop();
    if(Array.isArray(next)) {
      // push back array items, won't modify the original input
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // reverse to restore input order
  return res.reverse();
}

const arr = [1, 2, [3, 4, [5, 6]]];
flatten(arr);

/*********************************************************************************************************************************/
/*************************follow up questions for the above program**************************************************************/

/****************************Can we solve the above program by mutating the original array itself and not using extra space?**/
/***********************************flatten only uptil a particular depth *************************************************/

/***to flatten 1 level array ***************/
const arr = [1, 2, [3, 4]];

// To flat single level array
arr.flat();
// is equivalent to
arr.reduce((acc, val) => acc.concat(val), []);
// [1, 2, 3, 4]
/* Another approach to flatten 1 level nested array*/
const arr = [1, 2, [3, 4,5,6,7]];

const flattened = arr => [].concat(...arr);
console.log(flattened(arr));

/**************To flatten upto a particular depth***********/
const arr = [1, 2, [3, 4, [5, 6]]];

// to enable deep level flatten use recursion with reduce and concat
function flatDeep(arr, d = 1) {
   return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
                : arr.slice();
};

flatDeep(arr, Infinity);//we can pass depth as 1,2 or infinity,etc

