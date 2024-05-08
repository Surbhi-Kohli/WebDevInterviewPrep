### useEffect vs useLayoutEffect

The Difference Between useEffect and useLayoutEffect
It’s all in the timing.

useEffect runs asynchronously and after a render is painted to the screen.

So that looks like:

You cause a render somehow (change state, or the parent re-renders)
React renders your component (calls it)
The screen is visually updated
THEN useEffect runs

useLayoutEffect, on the other hand, runs synchronously after a render but before the screen is updated. That goes:

You cause a render somehow (change state, or the parent re-renders)
React renders your component (calls it)
useLayoutEffect runs, and React waits for it to finish.
The screen is visually updated

 if your effect is mutating the DOM (via a DOM node ref) and 
 the DOM mutation will change the appearance of the DOM node between the time 
 that it is rendered and your effect mutates it, then you don't want to use useEffect.
 You'll want to use useLayoutEffect. Otherwise the user could see a flicker when your DOM mutations take effect. This
 is pretty much the only time you want to avoid useEffect and use useLayoutEffect instead.
 
 
### useLayoutEffect
This runs synchronously immediately after React has performed all DOM mutations.
i,e it runs immediately after the DOM HAS BEEN UPDATED , BUT BEFORE THE BROWSER HAS HAD A CHANCE TO PAINT THOSE CHANGES.
(the user doesn't actually see the updates until after the browser has repainted).This can be useful if you need to make
DOM measurements (like getting the scroll position or other styles for an element) and then make DOM mutations or trigger a synchronous re-render by updating state.
One special case
One other situation you might want to use useLayoutEffect instead of useEffect is if you're updating a value (like a ref) and you want to make sure it's up-to-date
before any other code runs. For example:
```
const ref = React.useRef()
React.useEffect(() => {
  ref.value = 'some value'
})
// then, later in another hook or something
React.useLayoutEffect(() => {
  console.log(ref.value) // <-- this logs an old value because this runs first!
})
```
So in situations like that, the solution is useLayoutEffect.
