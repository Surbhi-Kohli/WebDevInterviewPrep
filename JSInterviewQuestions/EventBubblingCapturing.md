## Event Bubbling and Event Capturing

These are 2 methods of event propogation in DOM tree
<img width="653" alt="Screenshot 2024-06-03 at 10 39 06 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/bfe14a8f-7700-4b78-836b-8f9abf131c86">
### Event Bubbling : 
when u click on the child div,
onClickChild() is called, the onClickParent and then onClickGrandparent

When you click on parent div,
onClickParent is called and then onClickGrandparent is called.
### Event Capturing(Also known as event trickling) :
When you click on the child div,
onClickGranparent gets called first,then onClickParent and then onClickChild.

When you click on parent div,
onClickParent is called and then onClickChild is called.

It is for the developers to decide whether to use event capturing and event bubbling.

<img width="898" alt="Screenshot 2024-06-03 at 11 05 50 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/009170ae-0a7e-41bb-ad65-906b59d8d904">

```
/*You can pass 3rd argument ,which would denote the bubbling or capturing.
If u set it to true,the event will be captured.By default the events bubble up if u dont pass the 3rd argument to eventListener.
*/
let useCapture=true;
addEventListener('click',()=>{
},useCapture)
```
On the basis on useCapture , either event capturing or bubbling happens.

```
//index.html
<!DOCTYPE html>
<head>
<title>Akshay Saini</title>
<style>
div{
min-width:100px;
min-height:100px;
border:1px solid black;
}
</style>
</head>
<body>
  <div id="grandparent">
   <div id="parent">
     <div id="child"></div>
   </div>
  </div>
<script src="./js/index.js"></script>
</body>
</html>

//index.js:
document.querySelector("#grandparent")
.addEventListener('click',()=>{
    console.log("Grandparent Clicked");
});
document.querySelector("#parent")
.addEventListener('click',()=>{
    console.log("Parent Clicked");
});

document.querySelector("#child")
.addEventListener('click',()=>{
    console.log("Child Clicked");
});
```
For the above, when you click child:
Child Clicked
Parent CLicked 
Grandparent Clicked

If we update the code in index.js to below:
```
document.querySelector("#grandparent")
.addEventListener('click',()=>{
    console.log("Grandparent Clicked");
},true);
document.querySelector("#parent")
.addEventListener('click',()=>{
    console.log("Parent Clicked");
},true);

document.querySelector("#child")
.addEventListener('click',()=>{
    console.log("Child Clicked");
},true);
```
When you click Child div, Output:
Grandparent Clicked
Parent Clicked 
Child Clicked

## Mix and match of bubbling and capturing
According to w3c, the whole cycle completes with Capturing first and then bubbling

```
