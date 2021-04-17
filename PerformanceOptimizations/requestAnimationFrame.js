/*The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified 
function to update an animation before the next repaint.
The method takes a callback as an argument to be invoked before the repaint.
This separates the DOM reading and writing and thus prevents layout thrashing
You should call this method whenever you're ready to update your animation onscreen. This will request that your animation function be called before the browser 
performs the next repaint. The number of callbacks is usually 60 times per second, but will generally match the display refresh rate in most web browsers as per 
W3C recommendation. requestAnimationFrame() calls are paused in most browsers when running in background tabs or hidden <iframe>s in order to improve performance
and battery life.*/

const {
  containerWidth,
  registerNextClick,
 } = setup();

 const elements = Array.from(document.querySelectorAll('.element'));

 registerNextClick(function (timestamp) {
  elements.forEach((element, index) => {
    //calculations-->read
    const top = element.offsetTop;
    const nextPosition = +((Math.sin(top + timestamp/1000) + 1) / 2 * containerWidth);
    
    //this write (the callback function in requestAnimationFrame) will happen only before repaint
    //and not 
    requestAnimationFrame(() => {
      element.style.transform = `translateX(${nextPosition}px)`;
    })
  });
 });
