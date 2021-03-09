React’s useState hook can get you a really long way with React state management. That said, sometimes you want to separate 
the state logic from the components that make the state changes. In addition, if you have multiple elements of state that typically change together, 
then having an object that contains those elements of state can be quite helpful.

This is where useReducer comes in really handy.

```
function nameReducer(previousName, newName) {
    return newName
  }
/*The reducer function,here,nameReducer accepts 2 argumants:1st argument is the initial state and second argument is the action:its a payload object sent by dispatch */

const initialNameValue = 'Joe'

function NameInput() {
 
  const [name, setName] = React.useReducer(nameReducer, initialNameValue) /*userReducer here is taking 2 args:1st is the name of the reducer and 2nd is the initial state
  the useReducer may also take 3 arguments ,where 1st argument is the reducer function,2nd arg is the the initial value to be passed as argument to the 3rd arg.the 3rd
  arg is a function for lazy initialization.*/
  const handleChange = event => setName(event.target.value)
  return (
    <>
      <label>
        Name: <input defaultValue={name} onChange={handleChange} />
      </label>
      <div>You typed: {name}</div>
    </>
  )
} 
```

**Use case for lazy initialization
 sometimes lazy initialization can be useful, so here’s how we’d do that with our original hook App:
 ```
 function init(initialStateFromProps) {
  return {
    pokemon: null,
    loading: false,
    error: null,
  }
}

// ...

const [state, dispatch] = React.useReducer(reducer, props.initialState, init)
```

So, if you pass a third function argument to useReducer, it passes the second argument to that function and uses the return value for the initial state.
This could be useful if our init function read into localStorage or something else that we wouldn’t want happening every re-render.
