Object creation via new keyword

```
function Person(name,profession){
this.name=name;
this.profession=profession
}
```
 In JS , any function that defines a type is referred to as a constructor function.
 But there are 2 unsaid rules about constructor functions
       
       1.The name of the construcotr function should start with uppercase letter.
       2.When we invoke a constructor function,we always do it using the "new" operator.
    ```
    var saloni=new Person("Saloni","SE");
    console.log(saloni)//Person {name:"Saloni",profession:"SE"}
    ```
    
  Basic usage of new operator:Helps us create instances of the constructor function.


  What happens when the "new" operator is used to invoke a constructor function?
    
    ```
    function Person(name,profession)
    {
     //1.a new object is created and assigned to "this" inside the function
     //ie this={}
     //2.the function body executes and can modify "this"
      this.name=name;
      this.profession=profession
      //3.The implicit "this" value is returned if no explicit non-primitive value is returned
      //ie return this(under the hood)
    }
    var yomesh=new Person("Yomesh","SE");
    console.dir(yomesh);
    //Person {name:"Yomesh",profession:"SE"};
    
    ```
    
  Implicit "this" return
    
    ```
    var thisReference;
    function Person(name,profession)
    {
    //this:{}
    this.name=name;
    this.profession=profession;
    thisReference=this;
    }
    var yomesh=new Person("Yomes","SE");
    console.log("Are u two same??",thisReference===yomesh)//true
    ```
  Output is true :signifies that the object returned by the Person constructor was actually the object that "this" pointed to.



  Explicit non-primitive return
  (Non primitives in js:[],{},()=>{} ie arrays, objects and functions)

    ```
    function Person(name,profession)
    {
     this.name=name;
     this.profession=profession;
    
    //Here we have explicit non-primitive return, so the "this"object setting is ignored
    return {
    name:"Ajay"
    }
    }
    var yomesh=new Person("Yomesh","SE");
    console.log(yomesh.name)//Ajay
    
    ```
