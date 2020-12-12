import React, { Component } from "react";

class Main extends Component {
  state = {
    text: "HELLO!",
    counter: 0
  };
  increaseCounter = () => {
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
  };
  render() {
    return (
      <First
        render={num => (
          <Second>
            <Third text={this.state.text} />
            <h2>Is this working????</h2>
            <h3>Random number is: {num}</h3>
            <button onClick={this.increaseCounter}>Click me!</button>
            <h3>Counter: {this.state.counter}</h3>
          </Second>
        )}
      />
    );
  }
}

const First = props => {
  let number = Math.floor(Math.random() * 10);
  return (
    <div>
      <h1>First Component</h1>
      {props.render(number)}
    </div>
  );
};

const Second = props => {
  return (
    <div>
      <h2>Second Component</h2>
      {props.children}
    </div>
  );
};

const Third = props => {
  return (
    <div>
      <h2>Third Component</h2>
      <h3>Text is: {props.text}</h3>
    </div>
  );
};

export default Main;
