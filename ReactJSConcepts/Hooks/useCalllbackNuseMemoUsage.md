### when should I useMemo and useCallback?
There are specific reasons both of these hooks are built-into React:

1.Referential equality
2.Computationally expensive calculations

Referential equality
If you're new to JavaScript/programming, it wont take long before you learn why this is the case:

true === true // true  
false === false // true  
1 === 1 // true  
'a' === 'a' // true  
{} === {} // false  
[] === [] // false  
() => {} === () => {} // false
const z = {}   
z === z // true 

When you define an object inside your React function component, it is not going to
be referentially equal to the last time that 
same object was defined (even if it has all the same properties with all the same values).

There are two situations where referential equality matters in React, let's go 
through them one at a time.

**Dependencies lists
Let's review an example.

Warning, you're about to see some seriously contrived code. Please don't nit-pick that and just focus on the concepts please, thank you.
function Foo({bar, baz}) {
  const options = {bar, baz}
  React.useEffect(() => {
    buzz(options)
  }, [options]) // we want this to re-run if bar or baz change
  return <div>foobar</div>
}
function Blub() {
  return <Foo bar="bar value" baz={3} />
}

The reason this is problematic is because useEffect is going to do a referential equality
check on options between every render, 
and thanks to the way JavaScript works, options will be new every time so when
React tests whether options changed between renders it'll 
always evaluate to true, meaning the useEffect callback will be called after
every render rather than only when bar and baz change.

There are two things we can do to fix this:
// option 1
function Foo({bar, baz}) {
  React.useEffect(() => {
    const options = {bar, baz}
    buzz(options)
  }, [bar, baz]) // we want this to re-run if bar or baz change
  return <div>foobar</div>
}
That's a great option and if this were a real thing that's how I'd fix this.

But there's one situation when this isn't a practical solution: 
If bar or baz are (non-primitive) objects/arrays/functions/etc:
function Blub() {
  const bar = () => {}
  const baz = [1, 2, 3]
  return <Foo bar={bar} baz={baz} />
}
This is precisely the reason why useCallback and useMemo exist. 
So here's how you'd fix that (all together now):

function Foo({bar, baz}) {
  React.useEffect(() => {
    const options = {bar, baz}
    buzz(options)
  }, [bar, baz])
  return <div>foobar</div>
}
function Blub() {
  const bar = React.useCallback(() => {}, [])
  const baz = React.useMemo(() => [1, 2, 3], [])
  return <Foo bar={bar} baz={baz} />
}
Note that this same thing applies for the dependencies array passed to useEffect, 
useLayoutEffect, useCallback, and useMemo.

React.memo 
Warning, you're about to see some more contrived code. Please be advised to not nit-pick this either but focus on the concepts, thanks.

Check this out:
function CountButton({onClick, count}) {
  return <button onClick={onClick}>{count}</button>
}
function DualCounter() {
  const [count1, setCount1] = React.useState(0)
  const increment1 = () => setCount1(c => c + 1)
  const [count2, setCount2] = React.useState(0)
  const increment2 = () => setCount2(c => c + 1)
  return (
    <>
      <CountButton count={count1} onClick={increment1} />
      <CountButton count={count2} onClick={increment2} />
    </>
  )
}
Every time you click on either of those buttons, the DualCounter's state changes
and therefore re-renders which in turn will re-render both of the CountButtons. 
However, the only one that actually needs to re-render is the one that was clicked right? 
So if you click the first one, the second one gets re-rendered, but nothing 
changes. We call this an "unnecessary re-render."

MOST OF THE TIME YOU SHOULD NOT BOTHER OPTIMIZING UNNECESSARY RERENDERS. React is VERY fast and there are so many things I can think of for you to do 
with your time that would be better than optimizing things like this. 
In fact, the need to optimize stuff with what I'm about to show you is so rare that 

However, there are situations when rendering can take a substantial amount of time (think highly interactive Graphs/Charts/Animations/etc.).
Thanks to the pragmatistic nature of React, there's an escape hatch:

const CountButton = React.memo(function CountButton({onClick, count}) {
  return <button onClick={onClick}>{count}</button>
})
Now React will only re-render CountButton when its props change! Woo! But we're not done yet. Remember that whole referential equality thing? In the DualCounter
component, we're defining the increment1 and increment2 functions within the component functions which means every time DualCounter is re-rendered, those functions 
will be new and therefore React will re-render both of the CountButtons anyway.

So this is the other situation where useCallback and useMemo can be of help:
const CountButton = React.memo(function CountButton({onClick, count}) {
  return <button onClick={onClick}>{count}</button>
})
function DualCounter() {
  const [count1, setCount1] = React.useState(0)
  const increment1 = React.useCallback(() => setCount1(c => c + 1), [])
  const [count2, setCount2] = React.useState(0)
  const increment2 = React.useCallback(() => setCount2(c => c + 1), [])
  return (
    <>
      <CountButton count={count1} onClick={increment1} />
      <CountButton count={count2} onClick={increment2} />
    </>
  )
}
Now we can avoid the so-called "unnecessary re-renders" of CountButton.

I would like to re-iterate that I strongly advise against using React.memo (or it's friends PureComponent and shouldComponentUpdate) without
measuring because those optimizations come with a cost and you need to make sure you know what that cost will be as well as the associated benefit so you 
can determine whether it will actually be helpful (and not harmful) in your case, and as we observe above it can be tricky to get right all the time so you 
may not be reaping any benefits at all anyway.

Computationally expensive calculations
This is the other reason that useMemo is a built-in hook for React (note that this one does not apply to useCallback). The benefit to useMemo is that
you can take a value like:
const a = {b: props.b}
And get it lazily:

const a = React.useMemo(() => ({b: props.b}), [props.b])
This isn't really useful for that case above, but imagine that you've got a function that synchronously calculates a value which is computationally 
expensive to calculate (I mean how many apps actually 
need to calculate prime numbers like this ever, but that's an example):
function RenderPrimes({iterations, multiplier}) {
  const primes = calculatePrimes(iterations, multiplier)
  return <div>Primes! {primes}</div>
}
That could be pretty slow given the right iterations or multiplier and there's not too much you can do about that specifically.
You can't automagically make your user's hardware faster. But you can make it
so you never have to calculate the same value twice in a row, which is what useMemo will do for you:
function RenderPrimes({iterations, multiplier}) {
  const primes = React.useMemo(() => calculatePrimes(iterations, multiplier), [
    iterations,
    multiplier,
  ])
  return <div>Primes! {primes}</div>
}
The reason this works is because even though you're defining the function to calculate the primes on every render (which is VERY fast), React is only
calling that function when the value is needed. On top of that React also stores previous values given the inputs and will return the previous value given 
the same previous inputs. That's memoization at work.

Conclusion
I'd just like to wrap this up by saying that every abstraction (and performance optimization) comes at a cost. 
Apply the AHA Programming principle and wait until the abstraction/optimization is screaming at you before applying it 
and you'll save yourself from incurring the costs without reaping the benefit.

Specifically the cost for useCallback and useMemo are that you make the code more complex for your co-workers, you could make
a mistake in the dependencies array, and you're potentially making performance worse by invoking the built-in hooks and preventing dependencies 
and memoized values from being garbage collected. 
Those are all fine costs to incur if you get the performance benefits necessary, but it's best to measure first.
