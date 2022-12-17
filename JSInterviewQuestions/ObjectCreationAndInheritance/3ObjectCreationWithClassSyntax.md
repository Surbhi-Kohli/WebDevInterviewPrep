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
const user1-new UserCreator("Eva",9);
user1.increment();
