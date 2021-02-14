/*
In React quickstart, it is stated about Refs and Functional Components that
You may not use the ref attribute on functional components because they don't have instances:

*/
function MyFunctionalComponent() {
  return <input />;
}

class Parent extends React.Component {
  render() {
    // This will *not* work!
    return (
      <MyFunctionalComponent
        ref={(input) => { this.textInput = input; }} />
    );
  }
}

/*
Because they don't instantiate an object that inherits from their .prototype? As that is how "instance" is defined.
Functional components are re-rendered from top to bottom on each virtual DOM update. Since they are simple pure function, they just 
accept properties and output a piece of virtual DOM. Their lifespan is limited to a single render.

Default React components extend React.component class, so they inherit features like lifecycle hooks and internal state management. 
Those features allow the component to keep their 
state between renders and to behave accordingly. In that sense, I would call them components which have an instance.
*/
