/*Why would you use React.Children.map(props.children, () => ) instead of props.children.map(() => ) ?

It’s not guaranteed that props.children will be an array.

Take this code for example,
*/
<Parent>
  <h1>Welcome.</h1>
</Parent>
/*
Inside of Parent, if we were to try to map over children using props.children.map it would throw an error 
because props.children is an object, not an array.

React only makes props.children an array if there are more than one child elements, like this*/

<Parent>
  <h1>Welcome.</h1>
  <h2>props.children will now be an array</h2>
</Parent>
/*You want to favor React.Children.map because its implemention takes into account that props.children may be an array or an object.*/
