<Link to:{{ pathname:'/new-post'}}
      hash:'#submit',
      search:?quick-submit=true'
      }}>Click</Link>
      
 /************* routing-props*********/
 //only available in direct components rendered by route specified and not in nested components
 ///props.history.push()
 //props.location.search
 //props.match.path
 //props.match.params
 //props.match.url
 
 /*  Absolute path is always directly appended to ur domain
 wen u specify to="/post"
 it will go u localhost:9000/post
 even if u were on localhost:9000/newpost;
 u wont navigate to localhost:9000/newpost/post ;But what if u want to have a relative path
 u can do*/
 <Link to={{pathname:this.props.match.url+'/new-post'}}>CLick</Link>
 
 <NavLink to="/" exact activeClassName="my-active" activeStyle={{color:"#fa923f"}}>NavClick</NavLink>
 
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
 Redirect doesnt hv from,wen used outside of switch
 </Switch>
