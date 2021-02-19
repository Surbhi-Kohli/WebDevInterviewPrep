/*When we had class components, we could do stuff like this:*/

class MyInput extends React.Component {
  _inputRef = React.createRef()
  focusInput = () => this._inputRef.current.focus()
  render() {
    return <input ref={this._inputRef} />
  }
}

class App extends React.Component {
  _myInputRef = React.createRef()
  handleClick = () => this._myInputRef.current.focusInput()
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Focus on the input</button>
        <MyInput ref={this._myInputRef} />
      </div>
    )
  }
}
/*The key I want to point out in the example here is that bit above that says: <MyInput ref={this._myInputRef} />. 
What this does is give you access to the component instance.

With function components, there is no component instance, so this won’t work:*/
function MyInput() {
  const inputRef = React.useRef()
  const focusInput = () => inputRef.current.focus()
  // where do I put the focusInput method??
  return <input ref={inputRef} />
}
 /* 
 
 You’ll actually get an error if you try to pass a ref prop to a function component.
 So how do we solve this? Well, React has had this feature called forwardRef for quite a while. 
  */


/*Ref forwarding is an opt-in feature that lets some components take a ref they receive, and pass it further down (in other words, “forward” it) to a child.
In the example below, FancyButton uses React.forwardRef to obtain the ref passed to it, and then forward it to the DOM button that it renders:
*/


const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;

/*
This way, components using FancyButton can get a ref to the underlying button DOM node and access it if necessary—just like if they used a DOM button directly.

Here is a step-by-step explanation of what happens in the above example:

**We create a React ref by calling React.createRef and assign it to a ref variable.
**We pass our ref down to <FancyButton ref={ref}> by specifying it as a JSX attribute.
**React passes the ref to the (props, ref) => ... function inside forwardRef as a second argument.
**We forward this ref argument down to <button ref={ref}> by specifying it as a JSX attribute.
**When the ref is attached, ref.current will point to the <button> DOM node.
*/

 /* This actually works, however there are some edge case bugs with this approach when applied in React’s future concurrent mode/suspense feature
  (also it doesn’t support callback refs). So instead, we use the useImperativeHandle hook as follows 
  Consider an example with forwardRefs:*/
  const MyInput = React.forwardRef(function MyInput(props, ref) {
  const inputRef = React.useRef()
  ref.current = {
    focusInput: () => inputRef.current.focus(),
  }
  return <input ref={inputRef} />
})
/***************With useImperative hook***********************/
  const MyInput = React.forwardRef(function MyInput(props, ref) {
  const inputRef = React.useRef()
  React.useImperativeHandle(ref, () => {
    return {
      focusInput: () => inputRef.current.focus(),
    }
  })
  return <input ref={inputRef} />
})
