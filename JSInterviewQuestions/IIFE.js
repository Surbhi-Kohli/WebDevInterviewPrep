(function mul(x)
{
 var greet='Hello World';
 var toGreet=[].filter.call(greet,function(element,index){
 return index>5;
 })
 console.log(toGreet);
}());  //["W", "o", "r", "l", "d"]

//2
var salary="1000$";

(function ()
{
 console.log("orig salary was "+salary);
 var salary="5000$";
 console.log("new salary "+salary)
})();
//"orig salary was undefined"
//"new salary 5000$"

