/*Component nesting*/

/*Anything inside the <FancyBorder> JSX tag gets passed into the FancyBorder component as a children prop. Since 
FancyBorder renders {props.children} inside a <div>, the passed elements appear in the final output.*/

function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}//Render any child nested components
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}

ReactDOM.render(
  <WelcomeDialog />,
  document.getElementById('root')
);
