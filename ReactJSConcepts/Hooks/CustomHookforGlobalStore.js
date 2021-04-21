//Global store custom hook

//useStore.js
const context=React.createContext();

export const storeProvider=({children,initialState={}})=>{
  
  const [store,setStore]=React.useState(()=>initialState);
  const contextValue=React.useMemo(()=>[store,setStore],[store]);
  
  return <context.Provider value={contextValue}>
    {children}
    </context.Provider>
  
}
export default function useStore(){
  return React.useContext(context);
}
/***************************************/
//App.js
import {storeProvider} from './useStore';

const initialState={
todos:[]
}

function App(){
  return(<StoreProvider initialState={initialState}>
         <Todos/>
         </StoreProvider>
  
  )
  
}

/**********Consuming the store *****************/
//todo.js

import useStore from "./useStore"
function Todo(){
 const [{todos},setStore]=useStore();
  const addTodo=()=>{
   setStore(old=>({
   ...old,
     todos:[...old.todos,{name:'New Todo'}]
   })) 
  }
}
/******************************************************************/
//in the above code,we are directly manipulating the store with setState
//What if we make use of useReducer and dispatch actions ,based on which our state changes
//useStore.js
const context=React.createContext();

export const storeProvider=({children,reducer,initialState={}})=>{
  
  const [store,setStore]=React.useReducer(reducer,initialState);
  const contextValue=React.useMemo(()=>[store,dispatch],[store,dispatch]);
  
  return <context.Provider value={contextValue}>
    {children}
    </context.Provider>
  
}
export default function useStore(){
  return React.useContext(context);
}

/***************************************/
//App.js
import {storeProvider} from './useStore';

const initialState={
todos:[]
}
const reducer=(state,action)=>{
  switch(action.type)
  {
    case 'addTodo':
      return{
      ...state,
        todos:{
          ...state.todos,
          action.todo
        }
      }
    default:
      throw new Error('unkown action',action);
  }
}

/**************/
//todos.js

import useStore from "./useStore"
function Todos(){
 const [{todos},dispatch]=useStore();
  const addTodo=()=>dispatch({
  type:'addTodo',
    todo:{
     name:'new Todo' 
    }
  })
  return(
  <div>
    {todos.map(todo=>{
     return <Todo key={todo.id} todo={todo}/>
    }
  )}
    </div>
    
  )
}
//todo.js
import useStore from './useStore';

fucntion Todo({todo}){
  const [,dispatch]=useStore();
  
  const handleClick=()=>{

    dispatch({
    type:'toggleTodo',
      todoId:todo.id
    })
  }
  return(<div onClick={handleClick}>{todo.name}</div>)
}

function App(){
  return(<StoreProvider reducer={reducer} initialState={initialState}>
         <Todos/>
         </StoreProvider>
  
  )
  
}
  //Unnecessary Re-rendersss?? 
  //Even if we are dispatching from a component,we are re-rendering that  component in app-->multiple context to the rescue (concept by KCD) `\(*~*)/`
  
  
//useStore.js
const storeContext=React.createContext();
const dispatchContext=React.createContext();
  
export const storeProvider=({children,reducer,initialState={}})=>{
  
  const [store,setStore]=React.Reducer(reducer,initialState);
  const contextValue=React.useMemo(()=>[store,dispatch],[store,dispatch]);
  
  return(
    <dispatchContext.Provider value={dispatch}>
     <storeContext.Provider value={store}>
    {children}
    </context.Provider>
    </storeContext.Provider>
     </dispatchContext>
   )  
}
export  function useStore(){
  return React.useContext(storeContext);
}
  export function useDispatch(){
    return React.useContext(dispatchContext); 
  }
  
  //todos.js  -->Only needs the store value
  import {useStore} from "./useStore";
  import {Todo} from "./todo"; 
function Todos(){
 const {todos}=useStore();
  
  return(
  <div>
    {todos.map(todo=>{
     return <Todo key={todo.id} todo={todo}/>
    }
  )}
    </div>
    
  )
}
//todo.js
import {useDispatch} from './useStore';

fucntion Todo({todo}){
  const dispatch=useDispatch();
  
  const handleClick=()=>{

    dispatch({
    type:'toggleTodo',
      todoId:todo.id
    })
  }
  return(<div onClick={handleClick}>{todo.name}</div>)
}


//With the above multiple context,the components that are only using dispatch wont get updated in situations when ur store changes
  /****************************************************/
