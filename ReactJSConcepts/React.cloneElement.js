/*
props.children isn't the actual children; It is the descriptor of the children. So you don't have actually 
anything to change; you can't change any props, or edit any functionality; you can only read from it. If you need to make any modifications you
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
