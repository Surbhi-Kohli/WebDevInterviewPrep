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
