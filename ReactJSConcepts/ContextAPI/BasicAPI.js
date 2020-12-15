/*React.createContext*/
const MyContext = React.createContext(defaultValue);

/* Creates a Context object. When React renders a component that subscribes to this Context object it will 
   read the current context value from the closest matching Provider above it in the tree.

The defaultValue argument is only used when a component does not have a matching Provider above it in the tree.
This can be helpful for testing components in isolation without wrapping them. 
Note: passing undefined as a Provider value does not cause consuming components to use defaultValue. */

/* Context.Provider  */
<MyContext.Provider value={/* some value */}>


/*  Every Context object comes with a Provider React component that allows consuming components to subscribe to context changes.
    The Provider component accepts a value prop to be passed to consuming components that are descendants of this Provider. 
    One Provider can be connected to many consumers. Providers can be nested to override values deeper within the tree.
*/

/***********************************************************************************************************************************************************/

/************  IMPORTANT
All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes. 
The propagation from Provider to its descendant consumers (including .contextType and useContext) is not subject to the shouldComponentUpdate method, 
so the consumer is updated even when an ancestor component skips an update.
Changes are determined by comparing the new and old values using the same algorithm as Object.is.
The way changes are determined can cause some issues when passing objects as value: see Caveats.

***************/

/*********************************************************************************************************************************************************************/
/* Context.js */

import { createContext } from "react"
const shopContext=createContext();
const { Provider, Consumer } =shopContext;
export { Provider, Consumer ,shopContext };
/*******************************************************************************************************************************************************************/

/*  App.js*/

import React from "react";
import ReactDOM from "react-dom";
import { Provider,Consumer} from "./Context";


function App() {
  // Use the Provider to make a value available to all
  // children and grandchildren
  return (
    <Provider value={42}>
      <div>
        <Display />
      </div>
    </Provider>
  );
}

function Display() {
  // Use the Consumer to grab the value from context
  // Notice this component didn't get any props!
  return (
    <Consumer>
      {value => <div>The answer is {value}.</div>}
    </Consumer>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));

/** Context.Consumer **/

/*  A React component that subscribes to context changes. This lets you subscribe to a context within a function component.
Requires a function as a child. The function receives the current context value and returns a React node. 
The value argument passed to the function will be equal to the value prop of the closest Provider for this context above in the tree. 
If there is no Provider for this context above, the value argument will be equal to the defaultValue that was passed to createContext(). */
