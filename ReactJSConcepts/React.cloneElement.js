/*
props.children isn't the actual children; It is the descriptor of the children. So you don't have actually 
anything to change; you can't change any props, or edit any functionality; you can only read from it. If you need to make any modifications or extend the functionality
of children components,you
have to create new elements using React.CloneElement.
https://egghead.io/lessons/react-use-react-cloneelement-to-extend-functionality-of-children-components

An example:
main render function of a component such as App.js:*/

render() {   
    return(
            <Paragraph>
              <Sentence>First</Sentence>
              <Sentence>Second</Sentence>
              <Sentence>Third</Sentence>
            </Paragraph>   
    ) 
}
/**Buttons*/
function Buttons(props)
{ const [selected,setSelected]=useState('None');
 let selectItem=(val)=>{
     setSelected(val);
 }
 let cb=(child)=>{
     //as props are read only,so each child from props.children is readonly,so to add functionality to children,we actually need to clone them
     React.cloneElement(child,{
      onClick:(child)=>selectItem(child.value)   
     })
 }
 let items=React.Children.map(props.children,cb);
    return(
     <div>
        <h2>You have selected {selected}</h2>
        {items}
        </div>
    )
}
