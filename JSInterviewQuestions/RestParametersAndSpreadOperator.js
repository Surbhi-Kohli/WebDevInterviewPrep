/* What would be the output*/

function sum(first, ...middle, last) {
    return first + middle.reduce((acc, num) => acc + num, 0) + last;
}

console.log(sum(1, 2, 3, 4, 5));
/*a.15 b.undefined c.NaN d.uncaught error
ans-d
Explanation:Uncaught SyntaxError: Rest parameter must be last formal parameter i.e.
Rest parameter should always be the last parameter in function definition as it combines all the remaining arguments into an array.*/
