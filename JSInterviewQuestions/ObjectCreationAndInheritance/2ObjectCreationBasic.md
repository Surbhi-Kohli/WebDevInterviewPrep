1.Basic method

Objects store data and functions(encapsulation)

const user1={
    name:"Will",
    score:3,
    increment:function(){
    user1.score++;
    }
  }
user1.increment//makes the score as 4
/******************************************************************/

2.Using Object dot notation

const user2={}//empty object
user2.name="Tim",
user2.score=6;
user2.increment=function(){
user2.score++;
}
The above methods are not scalable and efficient.
/******************************************************************/

3.Using Object.create + dot notation
Object.create gives us an empty object with prototype set to the passed argument

const user3=Object.create(null)//no prototype object passed here
user3.name="Eva",
user3.score=9;
user3.increment=function(){
user3.score++;
}
With the above ways, our code is getting repetitive,we are breaking the DRY principle.And suppose we have millions of users,this process would be
inefficient.
/******************************************************************/

4.Use factory functions: 
Solution1:To prevent repitition:generate objects using functions
function userCreator(name,score){
const newUser={};
newUser.name=name;
newUser.score=score;
newUser.increment=function(){newUser.score++}
 return newUser;
}
const user1=userCreator("will",3);
const user2=userCreator("Tim",5);

user1.increment()//increments will's score to 4
/*Closure:The increment function has info of the surrounding memoryie info of label newUser*/
The previous approach of using factory functions has few problems.
a.The code of increment function for all users is same, but the code
is being stored in each object separately.Each time we create newUser object, we make space in our system's memory for all our data and functions.
But our functions are just copies of same code(memory wastage)

b.If you want to add new functionality to the objects, you will have to manually add to all functions


5.Make use of prototype(delegation)
We can store the common functions in an object([[Protoype]]) and have the interpreter ,check that [[Prototype]] instead of the main object 
for the function.
* Using Object.create()-make the link with Object.create

function userCreater(name,score){
const newUser=Object.create(userFunctionStore);//the userFunctionStore is set as the [[Prototype]] of the newly created object
newUser.name=name;
newUser.score=score;
return newUser;
}

const userFunctionStore={
  increment:function(){this.score++},
  login:function(){console.log("logged in")}
}
const user1=userCreater("Will",3);
const user2=userCreater("tim",5);
user1.increment()
When user1.increment is called, interpreter searches for increment function in local memoryof user1.It is not there 
so it checks for [[Prototype]].
_ _proto_ _ is the getter/setter function for the [[Prototype]], although it is not recommended to set prototype via _ _proto_ _

Also note that an implicit argument("this") is passed to the increment function which actually points to the calling object

<img width="282" alt="Screenshot 2022-12-17 at 1 44 44 PM" src="https://user-images.githubusercontent.com/32058209/208232732-ad4d40fd-6f2d-498b-843d-38bf0c3bab38.png">

Using Object.setPrototype
