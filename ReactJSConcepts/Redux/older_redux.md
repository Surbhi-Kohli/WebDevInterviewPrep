
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


