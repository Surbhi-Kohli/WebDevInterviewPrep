/*********************************   Filter polyfill *****************************************************************/
Array.prototype.myFilter=function(callback,context)
{
  let arr=[];
  for(let i=0;i<this.length;i++)
  {
    if(callback.call(context,this[i],i,this))
    {
      arr.push(this[i]);
    }
  }
  return arr;

}
let arr2=[1,2,4,5,6,7,8];
let ans=arr2.myFilter((num,i)=>{
    if(num%2 ===0)
    return true;
})
console.log(ans); //[2,4,6,9]

/************************************** Map polyfill ************************************************************/
Array.prototype.myMap=function(callback,context)
{
  let arr=[];
  for(let i=0;i<this.length;i++)
  {
    let el=callback.call(context,this[i],i,this);
      arr.push(el);
    
  }
  return arr;

}
let arr2=[1,2,4,5,6,7,8];
let ans=arr2.myMap((num,i)=>{
    return num%2;
})
console.log(ans);//[1,0,0,1,0,1,0]

/***********************************bind polyfill**********************************************************/
Function.prototype.myBind=
function(){
  let arg=Array.prototype.slice.call(arguments);
  let that=arg[0];
  let params=arg.slice(1);
   let self=this;
   return function(){
     let params2=Array.prototype.slice.call(arguments);
     return self.apply(that,params.concat(params2));
   }
}
let basic = {
  'name': 'Surbhi',
  'age': 24
};

function callMe(city) {
  console.log('Hi!i m ' + this.name + ', my age is ' + this.age + ' and my city is ' + arguments[0] + ' and state is ' + arguments[1]);
}
let callBinded = callMe.myBind(basic, 'ASR');
callBinded('Punjab')//Hi!i m Surbhi, my age is 24 and my city is ASR and state is Punjab
