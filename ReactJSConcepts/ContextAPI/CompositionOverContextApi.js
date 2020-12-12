/*
Let’s imagine Main has a state which we want to pass to Third. 
With prop drilling, we can keep passing our prop down until we reach the component that we are going to use it.
*/

/*  If we are using prop drilling, our components will look like this: */

import React, { Component } from "react";

class Main extends Component {
  state = {
    text: "HELLO!"
  };
  render() {
    return <First text={this.state.text} />;
  }
}

const First = props => {
  return (
    <div>
      <h1>First Component</h1>
      <Second text={props.text} />
    </div>
  );
};

const Second = props => {
  return (
    <div>
      <h2>Second Component</h2>
      <Third text={props.text} />
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
/*  So the Main component has the state and we want to pass it to the Third component. 
Since we only have three components, this solution is completely fine. However, things get complicated 
if we need to go much deeper than this.*/

/***********************************************************************************/
//  With Composition//
import React, { Component } from "react";

class Main extends Component {
  state = {
    text: "HELLO!"
  };
  render() {
    return (
      <First>
        <Second>
          <Third text={this.state.text} />
          <h2>Is this working????</h2>
        </Second>
      </First>
    );
  }
}

const First = props => {
  return (
    <div>
      <h1>First Component</h1>
      {props.children}
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
//We can now see the text passed as a prop along with the h2 element which is the sibling element of our Third component. 
//This means we could successfully pass our props to deep levels with Composition.

/*****************************/
//Or u can pass the component itself as a prop
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// Now, we have:
<Page user={user} avatarSize={avatarSize} />
// ... which renders ...
<PageLayout userLink={...} />
// ... which renders ...
<NavigationBar userLink={...} />
// ... which renders ...
{props.userLink}
