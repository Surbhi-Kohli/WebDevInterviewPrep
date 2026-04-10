## 1. Defer vs Async attribute in <script> tag: [Refer MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script)
- If we don't add any attribute with script tag, it won't parse the HTML until script is downloaded completely. So, this kindof blocks the rendering of the page. [REFER Namaste React repo for asyc vs defer vs nothing specified]
- The defer attribute is a boolean attribute used with the <script> tag in HTML to control the execution of external JavaScript files.
- Execution only after the entire HTML document is parsed completely.
- Eg:
```
<script src="demo_defer.js" defer></script>
```
- When present, it instructs the browser to download the script in parallel with the HTML parsing process, but to defer its execution until the entire HTML document has been fully parsed.
- This prevents the **script from blocking the rendering of the page,** allowing content to be displayed more quickly to the user.
- Scripts with the defer attribute are executed in the **exact order they appear in the document**, ensuring predictable behavior, especially when one script depends on another.
- Deferred scripts keep their relative order, just like regular scripts. Let’s say, we have two deferred scripts: the long.js and then small.js:
      ```
      <script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
      <script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
      ```
      - Browsers scan the page for scripts and download them in parallel, to improve performance. So in the example above both scripts download in parallel. The small.js probably finishes first.
      - But the defer attribute, besides telling the browser “not to block”, ensures that the relative order is kept. So even though small.js loads first, it still waits and runs after long.js executes.

ASYNC:
- The async attribute is somewhat like defer. It also makes the script non-blocking.
- Parses HTML, downloads JS simultaneously, but does not wait for completion of parsing of HTML. Simply starts the execution of JS once the script is completed downloading.
- But it has important differences in the behavior:
  - The async attribute means that a script is completely independent:
    - The browser doesn’t block on async scripts (like defer).
    - Other scripts don’t wait for async scripts, and async scripts don’t wait for them. So, the relative order is not kept (opposed to Defer)

## 2. When to use what - async or defer?
- ASYNC: 
  - Scripts loaded using the async attribute will download the script without blocking the page while the script is being fetched. However, once the download is complete, **the script will execute, which blocks the page from rendering**.
  - This means that **the rest of the content on the web page is prevented from being processed and displayed to the user until the script finishes executing.** 
  - You get **no guarantee that scripts will run in any specific order**.
  - It is best to use async when the scripts in the **page run independently from each other and depend on no other script on the page.**
- DEFER:
  - Scripts loaded with the defer attribute will load in the order they appear on the page.
  - They won't run until the page content has all loaded, which is useful if your scripts depend on the DOM being in place (e.g., they modify one or more elements on the page).
  - **If your scripts need to wait for parsing and depend on other scripts and/or the DOM being in place, best to load them using defer and put their corresponding <script> elements in the order you want the browser to execute them.**


##  3. Can we create custom HTML tags?
- Yes we can create custom HTML elements. But remember: custom element names must include a hyphen (this is required by the HTML standard).So instead of <harshita>, you could make something like:
```
<harshita-card>
<harshita-box>
<harshita-profile>
```
- By default, these custom HTML elements are 'Inline' display.

## Display types in HTML
- block, inline, inline-block, flex, none, grid
  
- **none:** The element is not displayed at all (removed from layout flow)
- The element is completely removed from the layout flow. It’s as if the element doesn’t exist at all. Other elements take its place. 
    
- **block:**
  - Takes the full width available
  - Starts on a new line
  - You can set width/height, margin, padding
```
    Examples (by default):
    <div>, <p>, <h1>–<h6>, <section>, <article>
```
- **inline:**

  - Does not start on a new line
  - Can't set top bottom padding and margin, but can give left and right padding and margin
  - Only takes up as much width as its content
  - Width/height can’t usually be changed
```
Examples (by default):
<span>, <a>, <strong>, <em>
```

- **inline-block:**
- Behaves like inline (sits next to text) but **allows setting width/height**
- Example: <button> is often rendered this way

## display: none vs visibility: hidden
✅ display: none
  - The element is completely removed from the layout flow.
  - It’s as if the element doesn’t exist at all.
  - Other elements take its place.
    
✅ visibility: hidden
  - The element is still in the layout but not visible.
  - It takes up the same space as if it were visible.

## What is the display type of img tag?
- By default, it is **inline**...so can come side by side on the same line.
- But <img> is not a normal inline tag, it is 'inline replaced'.
- Since it is replaced by external, the browser behaves differently and allows setting width and height to it even though it is inline.

## What is "inline replaced"? 
  - The CSS specification classifies elements in two ways:
    - **Normal inline elements** →
      ```
       <span>, <em>, <strong>
      ```
      - They have no intrinsic dimensions.
      - Their size depends entirely on the text/content inside.
      - You can’t set width/height directly.

    - **Replaced elements** →
      ```
      <img>, <video>, <audio>, <iframe>, <canvas>
      ```
      - Their content is not defined by HTML **but “replaced” by something external (an image file, video, etc.).**
      - They come with intrinsic dimensions (e.g., an image has its pixel width/height).
      - Even if their display is inline, **browsers allow setting width/height.**
      - So when I said “under the hood it’s inline replaced”, I mean: The browser gives <img> a default display of inline BUT because it’s a replaced element, it behaves differently from normal inline elements:
        ✅ You can set width & height
        ✅ Padding and margin (all sides) work
        ✅ It aligns to baseline like inline text
        
        ⚡ **So visually <img> feels like inline-block**


## What is module-scope? [Refer MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#applying_the_module_to_your_html)
- We can have 2 types of script files: **Normal/ Classic script** and **Module Script**
- When we define a variable in a module script, it does not have a global scope and cannot be accesses via Javascript console.
- Therefore, you will only be able to access imported features in the script they are imported into, and you won't be able to access them from the JavaScript console, for example. You'll still get syntax errors shown in the DevTools, but you'll not be able to use some of the debugging techniques you might have expected to use.

Hence MODULE SCOPE means: 
- **Module-defined variables are scoped to the module unless explicitly attached to the global object. This scope is module-scope.**
- On the other hand, globally-defined variables are available within the module.
- **Global scope > Module scope > Function Scope**


## What will be the O/P when I want to run several code before the code inside import syntax gets executed?
- file-1.js:
```
console.log('Inside File 1');
import './file-2.js'
```
- file-2.js:
```
console.log('Inside File 2');
```
- ANS:  Output:
```
Inside File 2
Inside File 1 
```

- Explanation: the ECMAScript Module (ESM) spec requires that all **imports are resolved and loaded** before any code in the importing file runs. Hence, it first import file2 irrespective of where the import statement is.
- If we used require() method of classic JS, then file1 would get executed first, then file2 will be imported and executed later, since require() runs inline like a normal function call:
```
// file-1.js
console.log("Inside File 1");
require("./file-2.js");
```

Output would now be: 
```
Inside File 1
Inside File 2
```


## What are JS Modules?
- Modules are singleton. They will be loaded and executed only once.
- Modules can use import and export.
- Modules are always executed in strict mode.
- All objects (class, const, function, let, or var) are private unless explicitly exported.
- The value of this is undefined at the outer scope (not window).
- Modules are loaded asynchronously.
- Modules are loaded using CORS. see Access-Control-Allow-Origin: *.
- Modules don't send cookies and authentication info by default. See crossorigin="use-credentials".
- Imports are resolved statically at load time rather than dynamically at runtime.

