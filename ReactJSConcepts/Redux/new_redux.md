## give an example of app with state managed by redux and how and why multiple reducers would manage the state


Let's build a mini-e-commerce app to see how and why multiple reducers manage a single global state.
Our app has two main features: a Shopping Cart and a User Authentication system. 

------------------------------
### The Goal: The Global State Structure
Even though we write separate reducers, Redux merges them into a single, unified global state object that looks like this:  
```
{
  "auth": {
    "isLoggedIn": true,
    "username": "Alex"
  },
  "cart": {
    "items": ["Laptop", "Mouse"],
    "totalPrice": 1050
  }
}
```
------------------------------
### Why We Split This Into Multiple Reducers

   1. Clean Boundaries: The cart code shouldn't care about login tokens, and the login code shouldn't care about shopping item prices.
   2. Team Scalability: One developer can rewrite the checkout/cart logic without any risk of breaking the login system.

------------------------------
### Code Example: Managing State with Multiple Reducers
Here is how we build this using modern Redux Toolkit.
## 1. The Authentication Slice (Reducer 1)
This reducer only watches and modifies the state.auth slice. 
```
import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false, username: null },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload; // payload is the username string
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = null;
    }
  }
});
export const { login, logout } = authSlice.actions;export const authReducer = authSlice.reducer;
```
## 2. The Cart Slice (Reducer 2) 
This reducer only watches and modifies the state.cart slice. 
```
import { createSlice } from '@reduxjs/toolkit';
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalPrice: 0 },
  reducers: {
    addToCart: (state, action) => {
      // payload is an object: { name: 'Mouse', price: 50 }
      state.items.push(action.payload.name);
      state.totalPrice += action.payload.price;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    }
  }
});
export const { addToCart, clearCart } = cartSlice.actions;export const cartReducer = cartSlice.reducer;
```
## 3. Combining Them Into the Store
We pass both reducers to configureStore. It automatically combines them behind the scenes. 
```
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';import { cartReducer } from './cartSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer, // Directs state.auth changes here
    cart: cartReducer  // Directs state.cart changes here
  }
});
```
------------------------------
## How Redux Manages the Flow Under the Hood
When a user clicks "Log Out", your React component dispatches the action:
dispatch(logout()) which outputs the action object { type: 'auth/logout' }. 
Here is how [Redux](https://redux.js.org/) processes it:

   1. The Single Master Reducer receives the { type: 'auth/logout' } action.
   2. It passes this action to both authReducer and cartReducer.
   3. cartReducer looks at the type (auth/logout), realizes it doesn't care about login states, and instantly returns its current state completely untouched.
   4. authReducer looks at the type, matches its logout case, and changes isLoggedIn to false.
   5. Redux updates the central store, and only components listening to state.auth will re-render.
      
## The "Special Case": One Action, Multiple Reducers 
Sometimes, multiple reducers should respond to the exact same action. 
For example, when a user clicks "Log Out", you want to clear the user profile (authReducer) AND wipe the shopping cart clean so the next guest user doesn't see the previous user's items (cartReducer).
With multiple reducers, you can listen to the logout action in both files, allowing a single dispatch to reset two completely different sections of your global state simultaneously.  


# how will state be for these 3 reducers, will it be one single object with nested values

Yes, it will be one single, flat object where each reducer controls its own nested key. [1] 
Redux merges them so that your entire application state is structured like a single tree. [2, 3, 4] 
## How the State Looks Under the Hood
If you have three separate domain reducers—authReducer, productsReducer, and cartReducer—and combine them using configureStore, your absolute global Redux state looks exactly like this:

{
  "auth": {
    "isLoggedIn": true,
    "user": "Alex"
  },
  "products": {
    "list": ["Laptop", "Mouse"],
    "isLoading": false
  },
  "cart": {
    "items": [],
    "total": 0
  }
}

## The Slice of Responsibility
The most important thing to understand is that each reducer only sees and manages its own key.

* authReducer only receives and can modify the data inside { isLoggedIn, user }. It is completely blind to the cart or products keys.
* cartReducer only receives and can modify the data inside { items, total }.

Redux handles the glue work. When a reducer updates its specific nested value, Redux plugs it back into this main global object and notifies React. 

## How You Access It in a Component
Because it is one single object, accessing it with modern Redux hooks (like useSelector) is straightforward. You just point to the specific nested key you need: 
```
// Accessing the auth nested valueconst username = useSelector(state => state.auth.user);
// Accessing the cart nested valueconst cartItems = useSelector(state => state.cart.items);

```
