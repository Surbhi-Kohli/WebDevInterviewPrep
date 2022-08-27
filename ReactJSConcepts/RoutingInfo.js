//BrowserRouter->Wrapp ur app inside this component so as to make use of routing.Now any component ,which is child of msil app case use routing functionalities

/*Setting up and rendering routes:
<Route path="/" exact render={()=><h2>Home</h2>} />  if u dont use exact,all routes that start with "/" will render the h2
//************************************************************
<Route path="/" exact render={()=><h2>Home</h2>} />
<Route path="/"  render={()=><h3>Home 2</h3>} />//this will always be rendered since every path starts with "/"

Another way to use route
<Route path="/"  exact component={Posts}/>
**********************
Using Links to switch pages
import {Link} from 'react-router-dom"
<Link to="/">Home</Link>//prevents default behaviour of refresh where a page is tried to fetch from server

<Link to={{
  pathname:"/new-post",
  hash:"#submit" //to jump to the part of the page which has the submit id,
  search:"?quick-submit=true"
}}>Home</Link>
*******************************
*/
/**************************************************/
<Link to:{{ pathname:'/new-post'}}
      hash:'#submit',
      search:?quick-submit=true'
      }}>Click</Link>
      **************************************
            Using routing relted props:
if u log the props of a component rendered by routing:
u will see the following:
history:{}//has some methods
location:{
 hash:"", 
 key:"",      
 pathname:"/",
 search:"",
  state:{}     
      
}
match:{
      isExact:true,
       params:{},
       path:"/",
       url:"/"
}
 /************* routing-props*********/
 //only available in direct components rendered by route specified and not in nested components
 ///props.history.push()
 //props.location.search
 //props.match.path
 //props.match.params
 //props.match.url
 /****
 withRouter HOC
 What if we want the routing related props inside a component that is not rendered through a route,but in a component that is lets say a child of a component rendered
 by the route.There wont be any routing related props
 Routing related props are not passed down the component tree.
 1st way: pass onto children explicitly
 2nd way:use a higher order componet
 import{withRouter } from "react-router-dom";
 Now wrap your export default with withRouter
  ****/
 /*  Absolute path is always directly appended to ur domain
 wen u specify <Link to="/post">
 it will go u localhost:9000/post
 even if u were on localhost:9000/newpost;
 u wont navigate to localhost:9000/newpost/post since it is always treated as absolute path in case of to attribute ;
 But what if u want to have a relative path
 u can do*/
 <Link to={{pathname:this.props.match.url+'/new-post'}}>CLick</Link>
 /*************************
   Adding style to active class-use NavLink as it can help u add some styles to active link
 <NavLink to="/" exact activeClassName="my-active" activeStyle={{color:"#fa923f"}}>NavClick</NavLink>
Add exact so that full path can be matched and active class can be applied to exact link.U can use a attribute of activeClassName and specify ur own class.
Also u can use activeStyle attribute
 **************************
 <Route path="/" exact component={Posts}/>
 <Route path="/new-post" component={NewPost}/>
 <Route path="/:id" exact component={Posts}/>//  :id signifies something dynamic is gonna be added
 
// getting the param from url:
this.props.match.params.id,will have that id
Parsing Query Parameters & the Fragment
You learned how to extract route parameters (=> :id  etc). 

But how do you extract search (also referred to as "query") parameters (=> ?something=somevalue  at the end of the URL)?
How do you extract the fragment (=> #something  at the end of the URL)?

Query Params:
You can pass them easily like this:

<Link to="/my-path?start=5">Go to Start</Link> 

or

<Link 
    to={{
        pathname: '/my-path',
        search: '?start=5'
    }}
    >Go to Start</Link>
React router makes it easy to get access to the search string: props.location.search .

But that will only give you something like ?start=5 

You probably want to get the key-value pair, without the ?  and the = . Here's a snippet which allows you to easily extract that information:

componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    for (let param of query.entries()) {
        console.log(param); // yields ['start', '5']
    }
}
URLSearchParams  is a built-in object, shipping with vanilla JavaScript. It returns an object, which exposes the entries()  method. entries()  
returns an Iterator - basically a construct which can be used in a for...of...  loop (as shown above).

When looping through query.entries() , you get arrays where the first element is the key name (e.g. start ) and the second
element is the assigned value (e.g. 5 ).

FRAGMENT:
You can pass it easily like this:

<Link to="/my-path#start-position">Go to Start</Link> 

or

<Link 
    to={{
        pathname: '/my-path',
        hash: 'start-position'
    }}
    >Go to Start</Link>
React router makes it easy to extract the fragment. You can simply access props.location.hash .
//using exact
//Imagine that the user clicks a navlink which has a to="/foo",as per routes
<Switch>
 <Route path="/"  component={Posts}/>
 <Route path="/new-post" component={NewPost}/>
 <Route path="/:id" exact component={FullPost}/>
 </Switch>
//the first matching is the first route itself as both for /foo and /,starting is same
//so we need to use exact for the first route or either change the order of routes
//ie
<Switch>
 <Route path="/" exact component={Posts}/>
 <Route path="/new-post" component={NewPost}/>
 <Route path="/:id" exact component={FullPost}/>
 </Switch>
//or

 <Switch>
 <Route path="/new-post" component={NewPost}/>
 <Route path="/" exact component={Posts}/>
 <Route path="/:id" exact component={FullPost}/>
 </Switch>

//Using Switch

<Switch>
 <Route path="/" exact component={Posts}/>
 <Route path="/new-post" component={NewPost}/>
 <Route path="/:id" exact component={FullPost}/>
 </Switch>
 // here Posts will be rendered even wen we render new-Post,to avoid that put this in a switch.
 Without switch,all components might render,if they match the path
 //switch would load the first matching route
 
 
 //Nested routes
 <Switch>
 <Route path="/new-post" component={NewPost}/>
 <Route path="/" exact component={Posts}/>
 </Switch>
 
 
 in Posts.js
 <div>
 {posts}
 <Route path={this.props.match.url+ "/:id"} component={FullPost}/>
 </div>
 
 <Switch>
 <Route path="/" exact component={Posts}/>
 <Route path="/new-post" component={NewPost}/>
 <Route path="/:id" exact component={FullPost}/>
 <Redirect from="/" to="/posts"/>
 </Switch>
 Redirect doesnt hv 'from',wen used outside of switch
 </Switch>
       //404 case
  <Switch>
 <Route path="/" exact component={Posts}/>
 <Route path="/new-post" component={NewPost}/>
 <Route path="/:id" exact component={FullPost}/>
 <Route component={FourOhFour}/>
 </Switch>
