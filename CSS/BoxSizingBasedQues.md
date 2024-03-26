
# box-sizing in css
Pre read: https://www.freecodecamp.org/news/how-to-use-the-css-box-sizing-property/


## Consider a div with class container and the following CSS styling. What will be the width of the element?  

  
		.container {
			width: 100px;
			height: 100px;
			padding: 30px;
			border: 30px solid lightblue;
			margin: 30px;
		}
		//ans-220
 The width of our elment using the standard box model will actually be 220px (100 + 30 + 30 + 30 + 30), as the padding and border are added to the width used for the **content box**.

### Total width of the element = Width + Padding + Border  in case of box-sizing:content-box(default value)

There is another box model called Alternative Box Model(**border-box**). Using this model, any width is the width of the visible box on the page, 
therefore the content area width is that width minus the width for the padding and border. The following CSS would give the result width = 100px.

			.container { 
			  box-sizing: border-box; 
                          width: 100px;
		          height: 100px;
			  padding: 30px;
			  border: 30px solid lightblue;
			  margin: 30px;
			} 
