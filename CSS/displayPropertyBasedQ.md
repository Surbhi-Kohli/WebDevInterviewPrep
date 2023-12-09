## Pre read: https://dev.to/shimphillip/inline-vs-inline-block-vs-block-280h

## What is the diff between display:inline,display:block and display:inline-block?
ans-  
**display:block**, block elements take the entire width available for them,effectively they add a line break b4 and after them.  

**display:inline**, take minimum amount of space possible.But we cant set width and height for them

**display:inline-block** ,act like inline(i.e take min space possible),but we can give our height 
n width.
Here is a list of common inline-block elements

<input>
<button>
<select>
<textarea>
Interestingly enough, you will notice that most of these elements are related with <form> elements.

