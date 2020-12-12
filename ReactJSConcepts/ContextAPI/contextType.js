/*
The contextType property on a class can be assigned a Context object created by React.createContext(). 
This lets you consume the nearest current value of that Context type using this.context.
You can reference this in any of the lifecycle methods including the render function.
*/
const BennyPositionContext=createContext({x:50,y:50})

class Benny extends Component{

 componentDidMount() {
    let value = this.context;
    /* perform a side-effect at mount using the value of MyContext */
  }
  
render(){
  let value = this.context;
    /* render something based on the value of MyContext */
}
}
Benny.contextType=BennyPositionContext;

/*****Using contextType class property is great,but not particularly the best solution.You can ONLY USE ONE contextType within a class component.
This means if you need to introduce multiple COnsumers,u'll still have some nested code*****/
