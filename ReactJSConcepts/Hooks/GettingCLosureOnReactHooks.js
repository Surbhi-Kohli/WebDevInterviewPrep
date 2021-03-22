function useState(initVal){
 
 let _val=initVal;
 let state=()=>_val;
 
 const setState=(newVal)=>_val=newVal;
   
   return [state,setState];
}

const [count,setCount]=useState(1);
console.log(count());
setCount(2);
console.log(count());

/**********************************************************/
//Created a React Module
const React= (function(){
let _val;
function useState(initVal){
 
let state=_val||initVal;
 
 const setState=(newVal)=>_val=newVal;
   
   return [state,setState];
}
function render(Component){
  const c=Component();
  c.render();
  return c;
}
return {useState,render};
}
)()

function Component()
{
const [count,setCount]=React.useState(1);
return {
    render:()=>console.log(count),
    click:()=>setCount(count+1)
};
}
var App=React.render(Component);
App.click();
var App=React.render(Component);
App.click();
var App=React.render(Component);
App.click();
var App=React.render(Component);
App.click();
//The above implementation works well untill we have multiple states
/*********************************************   Below code works even for multiple useState calls            **********************************/
//Created a React Module
const React= (function(){
let hooks=[];
let index=0;//index being a live value is a problem
//when using setState for that state
function useState(initVal){
 const idx=index;
 console.log("idx is "+idx);
let state=hooks[index]||initVal;
 
 const setState=(newVal)=>{
 console.log("want to update to",newVal);
 console.log(idx);
 console.log("index is ",index);
 hooks[idx]=newVal;
 };
   index++;
   return [state,setState];
}
function render(Component){
  index=0;
  const c=Component();
  c.render();
  return c;
}
return {useState,render};
}
)()

function Component()
{
const [count,setCount]=React.useState(1);
const [text,setText]=React.useState("apple")
return {
    render:()=>console.log({count,text}),
    click:()=>setCount(count+1),
    type:word=>setText(word)
};
}
var App=React.render(Component);
App.type("pear");

var App=React.render(Component);
App.click();

var App=React.render(Component);

/******************************************    Implement Custom useEffect hook   ***************************************/

const React= (function(){
let hooks=[];
let index=0;
function useState(initVal){
 const idx=index;
let state=hooks[index]||initVal;
 const setState=(newVal)=>{
 hooks[idx]=newVal;
 };
   index++;
   return [state,setState];
}
 function useEffect(cb,depArray){
   const oldDeps=hooks[index];
   let hasChanged=true;
   if(oldDeps)
   {
    hasChanged=depArray.some((dep,i)=>!Object.is(dep,oldDeps[i]))
   }

    if(hasChanged)
    {  
     cb();
    }
    hooks[index]=depArray;
    index++;
 }
 function render(Component){
   index=0;
   const c=Component();
   c.render();
   return c;
 }
 return {useState,render,useEffect};
}
)()

function Component()
{
const [count,setCount]=React.useState(1);
const [text,setText]=React.useState("apple")
React.useEffect(()=>{
console.log('js confff')
},[])
return {
    render:()=>console.log({count,text}),
    click:()=>setCount(count+1),
    type:word=>setText(word)
};
}
var App=React.render(Component);
App.type("pear");

var App=React.render(Component);
App.click();

var App=React.render(Component);

/*
Output:
"js confff"
{
  count: 1,
  text: "apple"
}
{
  count: 1,
  text: "pear"
}
{
  count: 2,
  text: "pear"
}
*/
