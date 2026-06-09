
##  What would be the output when we click on "Add items" button?
```
class App extends React.Component {
	state = { items: [] };

	handleClick = () => {
		const { items } = this.state;
		this.setState({
			items: [...items, "apple"]
		});
		this.setState({
			items: [...items, "orange"]
		});
		this.setState({
			items: [...items, "mango"]
		});
		this.setState({
			items: [...items, "peach"]
		});
	};

	render() {
		const { items } = this.state;
		return (
			<div className="App">
				{items.length ? (
					<h2>Items are {JSON.stringify(items)}</h2>
				) : (
					<React.Fragment>
						<p>No items found</p>
						<button onClick={this.handleClick}>Add items</button>
					</React.Fragment>
				)}
			</div>
		);
	}
}
//Sol:Items are ["peach"]
```
Explanation:In React version < 17, it understands the execution context (important to note) and batches the setState calls as per that. 
No matter how many successive setState calls we make in a React event handler,
it will only produce a single re-render at the end of the event and reflects the state accordingly.

SOurce:Epic react,react-hooks,exercise 6
In case of  ```const [state,setState]=useState(''):```
when we call a bunch of state updaters in a row. This is normally not a problem, but each call to our state updater can 
result in a re-render of our component. React normally batches these calls so you only get a single re-render, but it’s unable to do this in
an asynchronous callback (like our promise success and error handlers).

So you might notice that if you do this
```
React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setStatus('pending')
    fetchPokemon(pokemonName).then(
      pokemon => {
        setPokemon(pokemon)
        setStatus('resolved')
      },
      error => {
        setError(error)
        setStatus('rejected')
      },
    )
  }, [pokemonName])
```
/* If u change order of setState,
setStatus('resolved')
setPokemon(pokemon)
You’ll get an error indicating that you cannot read image of null. Thats because our state updater calls were not batched.
This is because the setStatus call results in a re-render 
that happens before the setPokemon happens.

In the future, you’ll learn about how useReducer can solve this problem really elegantly, but we can still accomplish this by 
storing our state as an object that has all the properties of state we’re managing.

See if you can figure out how to store all of your state in a single object with a single React.useState call so I can update my state like this:

```setState({status: 'resolved', pokemon})```

This is a classic React interview question about **batched state updates** and **stale state**.

## Why is the output `["peach"]`?

Initial state:

```js
this.state = {
  items: []
};
```

When the button is clicked:

```js
const { items } = this.state;
```

At this moment:

```js
items === []
```

Now React executes:

```js
this.setState({
  items: [...items, "apple"]
});
```

This creates:

```js
{
  items: ["apple"]
}
```

But React does **not immediately update** `this.state`.

Next:

```js
this.setState({
  items: [...items, "orange"]
});
```

Notice it is still using the same local variable:

```js
items === []
```

So this becomes:

```js
{
  items: ["orange"]
}
```

Similarly:

```js
{
  items: ["mango"]
}
```

and finally:

```js
{
  items: ["peach"]
}
```

React batches all these updates and applies them together.

The final queued update wins:

```js
{
  items: ["peach"]
}
```

Hence:

```js
Items are ["peach"]
```

---

## Common misconception

Many people expect:

```js
["apple", "orange", "mango", "peach"]
```

because they think each `setState` sees the result of the previous one.

It doesn't.

All four updates are computed from:

```js
items === []
```

---

## How to fix it?

Use the functional form of `setState`:

```js
this.setState(prevState => ({
  items: [...prevState.items, "apple"]
}));

this.setState(prevState => ({
  items: [...prevState.items, "orange"]
}));

this.setState(prevState => ({
  items: [...prevState.items, "mango"]
}));

this.setState(prevState => ({
  items: [...prevState.items, "peach"]
}));
```

Now React executes them sequentially:

```text
[]
↓
["apple"]
↓
["apple", "orange"]
↓
["apple", "orange", "mango"]
↓
["apple", "orange", "mango", "peach"]
```

Final output:

```js
["apple", "orange", "mango", "peach"]
```

---

# The second example (`useState`)

Consider:

```js
setPokemon(pokemon)
setStatus('resolved')
```

vs

```js
setStatus('resolved')
setPokemon(pokemon)
```

The important part is that **before React 18**, updates inside promises were **not automatically batched**.

React understood event handlers:

```js
onClick={() => {
  setA(...)
  setB(...)
}}
```

and batched them.

But inside:

```js
fetch(...).then(...)
```

React often performed separate renders.

---

## Case 1

```js
setPokemon(pokemon)
setStatus('resolved')
```

Render sequence:

```text
Render 1
pokemon = actual data
status = pending

Render 2
pokemon = actual data
status = resolved
```

Works fine.

---

## Case 2

```js
setStatus('resolved')
setPokemon(pokemon)
```

Possible render sequence:

```text
Render 1
status = resolved
pokemon = null
```

UI sees:

```js
status === 'resolved'
```

and tries:

```js
pokemon.image
```

But:

```js
pokemon === null
```

Boom:

```text
Cannot read property 'image' of null
```

Then:

```text
Render 2
status = resolved
pokemon = actual data
```

but the error already happened.

---

# Why storing state as an object helps

Instead of:

```js
const [pokemon, setPokemon] = useState(null);
const [status, setStatus] = useState('idle');
const [error, setError] = useState(null);
```

use:

```js
const [state, setState] = useState({
  status: 'idle',
  pokemon: null,
  error: null
});
```

Then:

```js
setState({
  status: 'resolved',
  pokemon,
  error: null
});
```

One update.

One render.

No inconsistent intermediate state.

---

# Modern React (18+)

React 18 introduced **automatic batching** for many async situations:

```js
fetch(...).then(() => {
  setPokemon(...)
  setStatus(...)
})
```

These updates are typically batched automatically.

However, the interview lesson is still important:

### If new state depends on previous state

Use:

```js
setCount(prev => prev + 1);
```

not

```js
setCount(count + 1);
```

and

### If multiple pieces of state must change together

Consider:

```js
useReducer(...)
```

or

```js
useState({
  ...
})
```

so you update them atomically.

That's the deeper concept these examples are testing: **stale state, batching, and avoiding inconsistent intermediate UI states.**
