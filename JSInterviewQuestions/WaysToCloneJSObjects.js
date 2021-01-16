/*Fast cloning with data loss - JSON.parse/stringify*/
/*If you do not use Dates, functions, undefined, Infinity, RegExps, Maps, Sets, Blobs, FileLists, ImageDatas, sparse Arrays, Typed 
Arrays or other complex types within your object, a very simple one liner to deep clone an object is:*/

JSON.parse(JSON.stringify(object))

const a = {
  string: 'string',
  number: 123,
  bool: false,
  nul: null,
  date: new Date(),  // stringified
  undef: undefined,  // lost
  inf: Infinity,  // forced to 'null'
  re: /.*/,  // lost
}
console.log(a);
console.log(typeof a.date);  // Date object
const clone = JSON.parse(JSON.stringify(a));
console.log(clone);
console.log(typeof clone.date);  // result of .toISOString()
/*Output:

{
  bool: false,
  date: [object Date] { ... },
  inf: Infinity,
  nul: null,
  number: 123,
  re: [object RegExp] { ... },
  string: "string",
  undef: undefined
}
"object"
{
  bool: false,
  date: "2021-01-16T14:59:51.576Z",
  inf: null,
  nul: null,
  number: 123,
  re: { ... },
  string: "string"
}
"string"
*/
/**************************************************************************/
/*Object.assign() */


Object.assign only does a shallow copy of the keys and values, meaning if one of the values in the object is another object or an array, 
then it is the same reference as was on the original object.

var x = { a: 10, b: { c: 100 } };
var y = Object.assign({}, x);

y.a = 20;
console.log( x.a, y.a ); // prints 10 20

y.b.c = 200;
console.log( x.b.c, y.b.c ) // prints 200 200  as c is stored as a reference ,so updating by y,results in udating value of c in x.b as well
/***************************************************************************************************************/

