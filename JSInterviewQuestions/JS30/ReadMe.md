/***************************Day 13*******************************************************************/
Learning:
Code in consideration:1
 sliderImages.forEach((sliderImage,i)=>{
     //half way through the image
    
     const slideInAt=(window.scrollY+window.innerHeight)-sliderImage.height/2;//check this logic  
     
  //offsetTop tells about the pixels from top of window to top of image
   const imageBottom=sliderImage.offsetTop+sliderImage.height;
   
   //image will be half show when our slideIn value is > Offset of image from top
    const isHalfShown=slideInAt>sliderImage.offsetTop;
    
    const isNotScrolledPast=window.scrollY<imageBottom;
    
    if(isHalfShown && isNotScrolledPast)
    {     console.log("active on "+i);
        sliderImage.classList.add('active')
    }
    else{
      sliderImage.classList.remove('active');
    })
**window.scrollY:The read-only scrollY property of the Window interface returns the number of pixels that the document is currently scrolled vertically. 
**window.innerHeight:The read-only innerHeight property of the Window interface returns the interior height of the window in pixels, including the height 
                    of the horizontal scroll bar, if present.
**element.offsetTop:The HTMLElement.offsetTop read-only property returns the distance of the outer border of the current element relative to the
                      inner border of the top of the offsetParent node.  
                      
   Code in consideration:2
   window.addEventListener('scroll',throttle(checkSlide));//way to call eventListener with a throttle
/********************************************day14 ***********************************/


The CSS box model is rather complicated, particularly when it comes to scrolling content. While the browser uses the values from your CSS to draw boxes,
determining all the dimensions using JS is not straight-forward if you only have the CSS.

That's why each element has six DOM properties for your convenience: offsetWidth, offsetHeight, clientWidth, clientHeight, scrollWidth and scrollHeight.
These are read-only attributes representing the current visual layout, and all of them are integers (thus possibly subject to rounding errors).

Let's go through them in detail:

##offsetWidth, offsetHeight: The size of the visual box incuding all borders. 
Can be calculated by adding width/height and paddings and borders, if the element has display: block.Typically, offsetWidth is a measurement in pixels of the element's
CSS width, including any borders, padding, and vertical scrollbars (if rendered).
It does not include the width of pseudo-elements such as ::before or ::after.

clientWidth, clientHeight: The visual portion of the box content, not including borders or scroll bars , but includes padding . 
Can not be calculated directly from CSS, depends on the system's scroll bar size.The Element.clientWidth property is zero for inline elements and elements with no CSS;
otherwise, it's the inner width of an element in pixels. 
It includes padding but excludes borders, margins, and vertical scrollbars (if present).

scrollWidth, scrollHeight: The size of all of the box's content, including the parts that are currently hidden 
outside the scrolling area. Can not be calculated directly from CSS, depends on the content.
https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respective
   http://jsfiddle.net/y8Y32/25/
The offsetX read-only property of the MouseEvent interface provides the offset in the X coordinate of the mouse pointer between that event and
the padding edge of the target node. 

Syntax   
