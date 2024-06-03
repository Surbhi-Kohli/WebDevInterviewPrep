### Try Catch and Finally

https://medium.com/@goradux/back-to-basics-javascripts-try-catch-finally-181f8f6bc370

Everyone uses try ... catch statements in JavaScript, but how well do you
know try ... catch ... finally ? 
This article will cover some interesting caveats and behaviors of the construct.

#### Basic Usage
The finally statement is great for managing clean-up code — the most common 
use is gracefully closing files or database handlers. 
Such types of clean-up code need to be executed regardless of whether 
the original operation succeeds or fails.

The finally block is always executed after the try ... catch statement:

```
try {
  console.log(1);
} catch (exception) {
  console.log(2);
} finally {
  console.log(3);
}
// Output:
// 1
// 3
```

```
try {
  console.log(1);
  throw new Error("Some error");
} catch (exception) {
  console.log(2);
} finally {
  console.log(3);
}
// Output:
// 1
// 2
// 3
``` 
You can also omit the catch statement and use only try ... finally if you
don’t need to do any error-specific handling.

Now you might wonder, why do we even need an explicit finally statement?
Isn’t the code below functionally identical?
```
try {
  console.log(1);
} catch (exception) {
  console.log(2);
}
console.log(3); // cleanup here instead

```
The answer is no — there are clear differences in code behavior between using a finally statement
and having the clean-up code outside of the block.

#### The Difference
The finally statement will always* execute. This means that it will run:

* Right after a successful try block;
* Right after a successful catch block;
* Right before one of these control flow statements: return , throw , break, continue .

The first two cases are trivial, so let’s focus on the third one.
I will cover return and throw examples (break and continue follow the same rules).

*Exception: Ok, not always-always: if there is a process.exit() call or 
an infinite loop inside of try or catch, then finally will not run.

#### Return
finally will execute all of the code within the statement before returning:
```
function returnExample() {
  try {
    return "try return value";
  } finally {
    console.log("Triggers right before returning");
  }
}
console.log(returnExample())
// Output:
// "Triggers right before returning" 
// "try return value"
```
The same will happen if we have a return statement in the catch block:
```
function returnExample2() {
  try {
    throw new Error("some error");
  } catch (exception) {
    return "catch return value";
  } finally {
    console.log("Triggers right before returning");
  }
}
console.log(returnExample2());
// Output:
// "Triggers right before returning"
// "catch return value"

```

If we have nested finally statements, they will execute in order from the most nested 
one to the most outer one:

```
function returnExample3() {
  try {
    try {
      return "done";
    } finally {
      console.log("inner finally");
    }
  } finally {
    console.log("outer finally");
  }
}
console.log(returnExample3())
// Otput:
// "inner finally"
// "outer finally"
// "done"
```
By the same principle, if we have a return statement in the finally block, 
it will trigger before any other returns (both try and catch ones):

```
function returnExample4() {
  try {
    return "try return value";
  } finally {
    return "finally return value";
  }
}
console.log(returnExample4());
// Output:
// "finally return value"
```
Peculiar, isn’t it? Also, generally, you don’t want to have any control
flow statements (return/throw/break/continue) inside of finally in a real application.

#### throw
Now let’s talk about how finally reacts to throw statements. 
If the catch block can catch the error in atry block, then finally doesn’t do anything special. 
But what happens if the catch block also throws an error?

finally will still execute before throwing the error in the catch block:

```
try {
  console.log("try code");
  throw new Error("try error");
} catch (exception) {
  console.log("catch code");
  throw new Error("catch error");
} finally {
  console.log("finally code");
}
// Output:
// "try code"
// "catch code"
// "finally code"
// Uncaught Error: catch error

```

This is the key difference between having a finally statement and just doing the 
clean-up after the whole try ... catch block.

Sometimes people use nested try ... catch blocks inside of the original catch statement.
However, please note that in order to produce a similar behavior where we want to both clean
up and throw the error, we would need to duplicate the finally code, since it has to run 
both on success and failure:

