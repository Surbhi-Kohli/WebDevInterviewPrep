/**
 * What would be the output when we click on "Add items" button?
 */
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
/*Explanation:In React version < 17, it understands the execution context (important to note) and batches the setState calls as per that. 
No matter how many successive setState calls we make in a React event handler,
it will only produce a single re-render at the end of the event and reflects the state accordingly.*/

/**SOurce:Epic react,react-hooks,exercise 6
In case of  const [state,setState]=useState(''):
when we call a bunch of state updaters in a row. This is normally not a problem, but each call to our state updater can 
result in a re-render of our component. React normally batches these calls so you only get a single re-render, but it’s unable to do this in
an asynchronous callback (like our promise success and error handlers).

So you might notice that if you do this:*/
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
/* If u change order of setState,
setStatus('resolved')
setPokemon(pokemon)
You’ll get an error indicating that you cannot read image of null. Thats because our state updater calls were not batched.
This is because the setStatus call results in a re-render 
that happens before the setPokemon happens.

In the future, you’ll learn about how useReducer can solve this problem really elegantly, but we can still accomplish this by 
storing our state as an object that has all the properties of state we’re managing.

See if you can figure out how to store all of your state in a single object with a single React.useState call so I can update my state like this:

setState({status: 'resolved', pokemon})
*/
