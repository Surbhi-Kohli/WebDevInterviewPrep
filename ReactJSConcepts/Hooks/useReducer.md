React’s useState hook can get you a really long way with React state management. That said, sometimes you want to separate 
the state logic from the components that make the state changes. In addition, if you have multiple elements of state that typically change together, 
then having an object that contains those elements of state can be quite helpful.

This is where useReducer comes in really handy.

```
function nameReducer(previousName, newName) {
    return newName
  }

const initialNameValue = 'Joe'

function NameInput() {
  const [name, setName] = React.useReducer(nameReducer, initialNameValue)
  const handleChange = event => setName(event.target.value)
  return (
    <>
      <label>
        Name: <input defaultValue={name} onChange={handleChange} />
      </label>
      <div>You typed: {name}</div>
    </>
  )
} ```
