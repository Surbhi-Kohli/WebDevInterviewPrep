In the object creation via new keyword, we are writing our shared methods separately from 
our object 'constructor'(off in the userCreater.prototype object).Other languages let us do all this in one place.ES2015 lets us do this too
via classes

<img width="581" alt="Screenshot 2022-12-17 at 11 41 30 PM" src="https://user-images.githubusercontent.com/32058209/208255630-8a5fd4f0-759c-4975-b5cd-89f029518127.png">

```
class UserCreator{
constructor(name,score){
this.name=name;
this.score=score;
}
increment(){
this.score++;
}
login(){
console.log("login")
}
}
const user1=new UserCreator("Eva",9);
user1.increment();
```
Nothing is different in this code.It's just that we do the declaration and assignment in 1 construct ie within the class.
We take the label of the function & make it a label of the class.

When you declare a class,internally you get a function object combo;  

Constructor=function bit of the combo  
Object bit=prototype object,which will take in the common functions.

<img width="280" alt="Screenshot 2022-12-17 at 11 49 39 PM" src="https://user-images.githubusercontent.com/32058209/208255907-78b445fe-6ffd-466f-a0d6-3baf0d9769ff.png">
