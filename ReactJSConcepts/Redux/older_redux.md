
## older reducers had a peculiar way to update state where they did not mutate the original values but rather created new copies and returned those copies.is that correct, give example of one such reducer which has a complex state with nested valeus etc

Yes, that is completely correct. In traditional Redux, immutability was an absolute rule. [1] 
You could never modify the state directly (e.g., state.user.name = "Alex"). Instead, you had to use the JavaScript spread operator (...) to manually copy every single level of nested objects or arrays before changing a value. If you mutated the state directly, React would not re-render because it wouldn't detect that a new object had been created. [2, 3, 4, 5, 6] 
Here is an example of a traditional, older reducer managing a complex, deeply nested state.
## The Complex State Structure
Imagine an e-commerce dashboard state that tracks a user's profile, their nested preferences, and an array of orders:
```
const initialState = {
  user: {
    id: 101,
    profile: {
      name: "Alex",
      email: "alex@example.com"
    },
    preferences: {
      theme: "light",
      notifications: {
        email: true,
        sms: false
      }
    }
  },
  orders: [
    { id: "ord_1", status: "delivered", total: 50 },
    { id: "ord_2", status: "pending", total: 120 }
  ]
};
```
------------------------------

## The Traditional Reducer (The Copy-and-Paste Nightmare)
Look closely at how many times the spread operator (...) must be used just to change the nested sms notification flag, or to update a specific order's status inside the array.
```
function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    
    // CASE 1: Updating a deeply nested value (preferences.notifications.sms)
    case 'TOGGLE_SMS_NOTIFICATIONS':
      return {
        ...state, // 1. Copy the top level (orders, user)
        user: {
          ...state.user, // 2. Copy the user object
          preferences: {
            ...state.user.preferences, // 3. Copy the preferences object
            notifications: {
              ...state.user.preferences.notifications, // 4. Copy notifications
              sms: !state.user.preferences.notifications.sms // 5. Finally change the value!
            }
          }
        }
      };

    // CASE 2: Updating an item inside a nested array safely
    case 'MARK_ORDER_DELIVERED':
      return {
        ...state,
        orders: state.orders.map(order => {
          if (order.id === action.payload) {
            return {
              ...order, // Copy the specific order object before modifying
              status: 'delivered'
            };
          }
          return order; // Return unchanged orders as references
        })
      };

    default:
      return state;
  }
}
```
------------------------------

## Why Did Traditional Redux Do This?

   1. Shallow Equality Checking: To find out if data changed, Redux doesn't check every single property inside an object (which is slow). It just checks if the memory address of the object changed (oldState === newState). If you return a brand new object copy, Redux instantly knows it needs to update the UI. [7, 8, 9, 10] 
   2. Time-Travel Debugging: Because old states were never destroyed (only new copies were made), Redux DevTools could save a history of your state over time, allowing you to jump backward and forward through your app's timeline. [11, 12, 13, 14, 15] 

## How Modern Redux Toolkit Fixed This
Writing that nested spread syntax was incredibly error-prone; missing just one ... would accidentally wipe out entire sections of your state. [16] 
Modern Redux Toolkit includes Immer under the hood. Immer tracks your changes and writes all those messy copy operations for you automatically. Today, Case 1 looks as simple as this: [17, 18, 19] 
```
// Inside a modern createSlice reducer:
toggleSmsNotifications: (state) => {
  state.user.preferences.notifications.sms = !state.user.preferences.notifications.sms;
}
```
Would you like to see how to convert the messy MARK_ORDER_DELIVERED array mapper code into a clean, modern Redux Toolkit mutation?

[1] [https://medium.com](https://medium.com/@skyshots/mastering-redux-toolkit-dive-into-createslice-createasyncthunk-and-extrareducers-d8d7c5dd47fc)
[2] [https://nikhilsomansahu.medium.com](https://nikhilsomansahu.medium.com/a-comprehensive-guide-to-understanding-redux-simplifying-state-management-521dd0e49c99)
[3] [https://www.wecreateproblems.com](https://www.wecreateproblems.com/interview-questions/redux-interview-questions)
[4] [https://www.linkedin.com](https://www.linkedin.com/advice/0/what-difference-between-mutable-immutable-objects-h5n0c)
[5] [https://www.dhiwise.com](https://www.dhiwise.com/post/react-update-state-essentials-managing-component-state)
[6] [https://github.com](https://github.com/reactjs/react.dev/issues/8147)
[7] [https://www.linkedin.com](https://www.linkedin.com/pulse/learn-5-minutes-understanding-immutability-shallow-deep-%C3%B6tenkaya-edxaf)
[8] [https://hmos.dev](https://hmos.dev/en/deep-dive-to-immer)
[9] [https://medium.com](https://medium.com/free-code-camp/why-redux-needs-reducers-to-be-pure-functions-d438c58ae468)
[10] [https://supertokens.com](https://supertokens.com/blog/why-is-redux-state-immutable)
[11] [https://redux.js.org](https://redux.js.org/faq/react-redux)
[12] [https://www.zignuts.com](https://www.zignuts.com/blog/react-state-management-2025)
[13] [https://selleo.com](https://selleo.com/blog/what-is-redux)
[14] [https://dev.to](https://dev.to/narenmnp/unleashing-the-power-of-react-context-simplifying-state-sharing-4388)
[15] [https://www.jobsity.com](https://www.jobsity.com/blog/why-and-when-you-should-use-redux)
[16] [https://www.reddit.com](https://www.reddit.com/r/reactjs/comments/r7bywg/best_way_to_update_large_sets_of_data_for_state/)
[17] [https://www.adaface.com](https://www.adaface.com/blog/redux-interview-questions/)
[18] [https://ko.redux.js.org](https://ko.redux.js.org/tutorials/essentials/part-2-app-structure/)
[19] [https://hswolff.com](https://hswolff.com/blog/level-up-usereducer-with-immer/)

## Q is this even valid to do inside the return object :state.orders.map(order => {

Yes, that map approach is completely valid and was actually the standard industry practice for updating a single item inside an array in traditional Redux.
The Array.prototype.map() function automatically returns a brand-new array. Because it doesn't mutate the original state.orders array, it perfectly satisfies Redux's immutability rules. Any order that doesn't match the ID is returned as a reference, which is highly efficient.
------------------------------
## Alternative Array Methods Used in Older Redux
Before modern Redux Toolkit came along, developers relied heavily on non-mutating array methods (concat, filter, slice operations) to add, remove, or modify data.
Here are the exact ways those functions were used:
## 1. Adding an Item (concat or the Spread Operator)
You could never use push(), because push mutates the original array. Instead, you had to use concat or the array spread operator to return a new array with the new item appended.

// Using concat (Returns a new array)case 'ADD_ORDER':
  return {
    ...state,
    orders: state.orders.concat(action.payload)
  };
// Using array spread syntax (The more popular alternative)case 'ADD_ORDER_SPREAD':
  return {
    ...state,
    orders: [...state.orders, action.payload]
  };

## 2. Removing an Item (filter)
To remove an item, Array.prototype.filter() was the gold standard. It loops through the array and returns a brand-new array containing only the items that match your condition.

case 'REMOVE_ORDER':
  return {
    ...state,
    orders: state.orders.filter(order => order.id !== action.payload)
  };

## 3. Inserting or Replacing at a Specific Index (slice)
If you needed to insert or replace an item at a specific index without using map, developers used a combination of Array.prototype.slice() and the spread operator.

case 'INSERT_ORDER_AT_INDEX':
  const index = action.payload.index;
  return {
    ...state,
    orders: [
      ...state.orders.slice(0, index),    // 1. Copy everything before the index
      action.payload.newOrder,            // 2. Insert the new item
      ...state.orders.slice(index)         // 3. Copy everything after the index
    ]
  };

------------------------------
## Comparison of Methods

| Operation | ❌ Avoid (Mutates original) | Use in Old Redux (Immutable) |
|---|---|---|
| Add Item | state.orders.push(item) | [...state.orders, item] or .concat(item) |
| Remove Item | state.orders.splice(index, 1) | state.orders.filter(...) |
| Update Item | state.orders[index] = newItem | state.orders.map(...) |
| Sort Array | state.orders.sort() | [...state.orders].sort() |

If you have a specific array operation you are trying to handle in a legacy codebase, tell me what you want to do with the array and I can write the exact clean copy logic for you!

Here is a complete, consolidated comparison showing a full traditional Redux reducer alongside its modern Redux Toolkit (RTK) equivalent.
We will manage an orders array, demonstrating how to Add, Remove, Update, and Insert items.
## The Initial State
Both setups use the exact same starting state structure:

const initialState = {
  orders: [
    { id: "ord_1", status: "pending", total: 50 },
    { id: "ord_2", status: "pending", total: 120 }
  ]
};

------------------------------
## 1. The Legacy Setup: Traditional Immutable Reducer
This approach uses manual array copying via the spread operator (...), .map(), .filter(), and .slice().

function legacyOrdersReducer(state = initialState, action) {
  switch (action.type) {
    
    // 1. ADD ITEM (using array spread)
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload] // payload: { id: "ord_3", status: "pending", total: 30 }
      };

    // 2. REMOVE ITEM (using filter)
    case 'REMOVE_ORDER':
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload) // payload: "ord_1"
      };

    // 3. UPDATE ITEM (using map)
    case 'MARK_DELIVERED':
      return {
        ...state,
        orders: state.orders.map(order => 
          order.id === action.payload 
            ? { ...order, status: 'delivered' } // payload: "ord_2"
            : order
        )
      };

    // 4. INSERT AT SPECIFIC INDEX (using slice)
    case 'INSERT_ORDER':
      const { index, newOrder } = action.payload; // payload: { index: 1, newOrder: {...} }
      return {
        ...state,
        orders: [
          ...state.orders.slice(0, index),
          newOrder,
          ...state.orders.slice(index)
        ]
      };

    default:
      return state;
  }
}

------------------------------
## 2. The Modern Setup: Redux Toolkit (RTK) Slice
Because Redux Toolkit integrates the Immer library, you can safely write standard, direct mutating JavaScript array methods (push, splice). Immer intercepts these calls and handles the immutable copying behind the scenes automatically.

import { createSlice } from '@reduxjs/toolkit';
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // 1. ADD ITEM (using simple push)
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },

    // 2. REMOVE ITEM (using findIndex + splice)
    removeOrder: (state, action) => {
      const index = state.orders.findIndex(order => order.id === action.payload);
      if (index !== -1) {
        state.orders.splice(index, 1);
      }
    },

    // 3. UPDATE ITEM (by direct property assignment)
    markDelivered: (state, action) => {
      const order = state.orders.find(order => order.id === action.payload);
      if (order) {
        order.status = 'delivered'; // Direct mutation is safe here!
      }
    },

    // 4. INSERT AT SPECIFIC INDEX (using simple splice)
    insertOrder: (state, action) => {
      const { index, newOrder } = action.payload;
      state.orders.splice(index, 0, newOrder); // Inserts at index without replacing
    }
  }
});
// Export auto-generated action creators for your componentsexport const { addOrder, removeOrder, markDelivered, insertOrder } = ordersSlice.actions;
// Export the reducer for store configurationexport default ordersSlice.reducer;

## Key Differences At a Glance

| Feature | Legacy Redux | Modern Redux Toolkit (RTK) |
|---|---|---|
| Adding Items | [...state.orders, newItem] | state.orders.push(newItem) |
| Removing Items | .filter() | .splice(index, 1) |
| Updating Items | .map() + deep object spread | Direct mutation (order.status = '...') |
| Inserting Items | Complex .slice() splitting | .splice(index, 0, newItem) |
| Safety | High risk of bugs if a spread is missed | Bulletproof logic managed by Immer |

Would you like to see how to write the unit tests for these actions, or see how a React component dispatches them in the new setup?

## Q; why the redux toolkit lets us mutate the original state
Redux Toolkit doesn't actually mutate your original state. It only looks like you are mutating it. [1, 2, 3] 
Under the hood, [Redux Toolkit](https://redux-toolkit.js.org/) automatically wraps every reducer you write inside a highly optimized library called Immer. [4] 
Here is exactly how Immer turns your "mutations" into safe, immutable updates. [5, 6] 
------------------------------
## The Secret: The "Draft" State
When you dispatch an action to a Redux Toolkit slice, Immer intercepts the execution and gives your reducer function a special proxy object called a Draft. [7, 8, 9, 10] 

   1. You modify the Draft: When you write state.orders.push(newItem) or order.status = 'delivered', you are not touching the actual Redux store. You are recording changes onto a temporary scratchpad (the Draft).
   2. Immer tracks the changes: Immer monitors every property you change, add, or delete. [11, 12] 
   3. Immer outputs a brand-new object: Once your reducer function finishes running, Immer takes that scratchpad, performs all the complex JavaScript spread (...) operations for you behind the scenes, and outputs a perfectly copied, immutable state object to the Redux store. [13, 14] 

[ Your Action ] 
       │
       ▼
 ┌───────────┐      Directly Modifies      ┌───────────────┐
 │  Reducer  │ ──────────────────────────> │  Draft State  │ (A temporary proxy)
 └───────────┘                             └───────┬───────┘
                                                   │
                                                   │ Immer calculates 
                                                   │ the differences...
                                                   ▼
                                           ┌───────────────┐
                                           │  Brand New    │ (Perfectly copied,
                                           │ Immutable State│  original is safe!)
                                           └───────────────┘

------------------------------
## Why Redux Toolkit Does This
The creators of Redux introduced this feature to fix the two biggest complaints developers had about traditional Redux:
## 1. It Eliminates the "Accidental Mutation" Bug [15] 
In old Redux, if you accidentally forgot a single spread operator (...) inside a deeply nested object, you would accidentally mutate the real state directly. When this happened, Redux would lose track of the changes, and your React UI would simply freeze and refuse to re-render. Immer makes this impossible. [16, 17] 
## 2. Massively Improved Readability
Instead of forcing you to read and write complex nested boilerplate code, you can use simple, standard JavaScript array and object operations.

// ❌ Old Way: Hard to read, easy to breakreturn {
  ...state,
  user: { ...state.user, profile: { ...state.user.profile, name: 'Alex' } }
};
//  Modern RTK Way: Clean, readable, and 100% safe
state.user.profile.name = 'Alex';

## One Golden Rule to Remember
You can only write "mutating" code inside Redux Toolkit slices (like createSlice) because that is the only place Immer is working. If you try to mutate state inside a standard React component or an old legacy reducer, you will break your application. [18, 19, 20, 21, 22] 
Would you like to see how to log your state inside a Redux Toolkit reducer? (Since it uses a Proxy object, running a standard console.log(state) will look strange, and there is a special RTK function you need to use to read it). [23] 

[1] [https://medium.com](https://medium.com/@ashantiwankaperera/mastering-state-management-with-redux-toolkit-a-beginners-guide-39d65d0c2dd5)
[2] [https://dev.to](https://dev.to/dewaldels/angular-developer-discovers-redux-toolkit-3bn8)
[3] [https://www.reddit.com](https://www.reddit.com/r/learnjavascript/comments/mvqcbh/what_is_the_proper_way_to_toggle_a_boolean_in_a/)
[4] [https://blog.logrocket.com](https://blog.logrocket.com/using-redux-toolkits-createasyncthunk/)
[5] [https://thoughtbot.com](https://thoughtbot.com/blog/getting-started-with-redux-toolkit)
[6] [https://dev.to](https://dev.to/imsushant12/the-journey-of-react-state-management-from-flux-redux-redux-toolkit-3mjc)
[7] [https://www.reddit.com](https://www.reddit.com/r/reactjs/comments/ru98i1/redux_toolkit_multiple_state_changes_in_one/)
[8] [https://www.zignuts.com](https://www.zignuts.com/blog/how-to-integrate-react-with-redux-toolkit)
[9] [https://www.twilio.com](https://www.twilio.com/docs/flex/developer/ui/redux)
[10] [https://adostes.medium.com](https://adostes.medium.com/simplify-redux-reducers-with-immer-9a3638229d45)
[11] [https://react.dev](https://react.dev/learn/updating-objects-in-state)
[12] [https://tigerabrodi.blog](https://tigerabrodi.blog/why-use-immer-for-state-updates)
[13] [https://blog.dushyanth.in](https://blog.dushyanth.in/mastering-state-management-with-zustand-and-immer-a-guide-to-efficient-state-updates)
[14] [https://bk10895.medium.com](https://bk10895.medium.com/simplify-state-management-with-redux-toolkit-and-immer-js-f9bfcd36198b)
[15] [https://redux-toolkit.js.org](https://redux-toolkit.js.org/usage/immer-reducers)
[16] [https://redux-toolkit.js.org](https://redux-toolkit.js.org/usage/immer-reducers)
[17] [https://github.com](https://github.com/bencompton/redux-retro)
[18] [https://blog.bitsrc.io](https://blog.bitsrc.io/simplifying-redux-with-redux-toolkit-6236c28cdfcb)
[19] [https://medium.com](https://medium.com/@aysunitai/mastering-state-management-in-react-with-redux-and-redux-toolkit-d8e6f09d5393)
[20] [https://redux.js.org](https://redux.js.org/tutorials/essentials/part-3-data-flow)
[21] [https://redux.js.org](https://redux.js.org/tutorials/essentials/part-2-app-structure)
[22] [https://www.reddit.com](https://www.reddit.com/r/reactjs/comments/v0lvhi/why_is_immer_mentioned_so_much_in_beta_reactjs/)
[23] [https://www.reddit.com](https://www.reddit.com/r/reactjs/comments/zrs0jo/not_able_to_access_redux_tk_state/)
