https://blog.logrocket.com/how-browser-rendering-works-behind-scenes/
https://dev.to/saurabhdaware/html-parsing-and-rendering-here-s-what-happens-when-you-type-url-and-press-enter-3b2o
https://developer.chrome.com/blog/inside-browser-part3#:~:text=Compositing%20is%20a%20technique%20to,to%20composite%20a%20new%20frame.

Q.
Which of the following statements are true?
a.The render tree contains all elements from DOM and CSSOM
b.Compositing is the process of separating layers based on z-index which are then combined to form the final image displayed on the screen.
c.The layout process assigns colors and images to the visual elements in render tree.
d.The compositing process happens on the compositor thread.
e.ELements that are not visible on the page, eg display:hidden are not part of dom tree.
Ans: d And this is like a separate thread in your GPU that your browser uses to kind ofoffload that pretty expensive compositing process.
a is incorrect because render tree only contains visual elements, the head elements and display:none elements wont be included
b is incorrect,Compositing is just a process of combining  layers together.And the z-index plays a role in kind of the stacking order of these layers,but it's not separating anything based on it itself.
c It's not the layout process, it's a paint process.
e:They are part of the DOM tree, just not the render tree.

Rendering pipeline  

<img width="857" alt="Screenshot 2023-12-14 at 10 10 34 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/46e417cb-9d7e-4c64-8ad5-da000e0763da">

Before the browser is able to render anything,it has to first parse the HTML and generate a DOM tree,which represents the static markup as a tree data structure.And it does the same for the CSS, but that one represents the styles and rules apply to every elements.And after doing it, kind of combines both trees, and it only includes like the visual elements ,the elements that will actually see on the screen into a render tree, and this tree contains both the styles as well as the HTML.
<img width="527" alt="Screenshot 2023-12-14 at 10 11 38 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/cd67c701-73ae-48e0-bcbf-88f514341052">


It doesn't include any elements that aren't visible,not the head elements or anything with display hidden.This is just what will eventually get rendered.

Based on this tree, the next phase happens which is the layout process.So in that case, it calculates the position, the size, and the geometry of every element that will eventually render on the screen.And it also takes into account like viewport, element dimensions all those things.

<img width="411" alt="Screenshot 2023-12-14 at 10 13 03 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/2c868346-090d-4174-af48-1e404523c8aa">

Then the next phase is the painting phase, right,when it actually creates a visual representation of a DOM tree onthe screen so it's actually when it starts to render those pixels, yeah,the entire rasterization process happens during this paints method.And this also takes into consideration the screen resolution,everything that can be painted on the screen.
<img width="394" alt="Screenshot 2023-12-14 at 10 13 31 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/e9fa0c42-af7b-4733-bb88-7eaaf338d18e">


Now after paints is the compositing phase.Because as the browser is painting it, it's actually doing it on a separate layersometimes depending on the styles you're using.
<img width="384" alt="Screenshot 2023-12-14 at 10 15 29 PM" src="https://github.com/Surbhi-Kohli/WebDevInterviewPrep/assets/32058209/c487b83c-be19-4dbb-ab2e-866da2e094af">


But then at the very end, it actually merges all those layouts together into onefinal bitmap, one final image that eventually gets rendered on the screen.So when we go back to those statements,the render tree contains all the elements from the DOM and the CSSOM combined
