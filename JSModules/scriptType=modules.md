A script tag having type="module" attribute specifies that it to be considered as a Javascript module.
It may be importing other Javascript module(s) inside it and becomes a "top-level" module for the imported modules.

Javascript modules are newly added in Javascript to help give a "modular" structure to an application.
However when we want to use Javascript modules in our HTML code, we need to do that within a <script type="module"> tag. 
Importing modules cannot be done in a normal script tag.
  
###  What is a Module in JavaScript?
A module is a Javascript file.

However unlike a normal Javascript file, a module can specify which variables and functions can be accessed outside the module.
Other sections of the module cannot be accessed. A module can also load other modules.

### Why Modules ?
With Web Applications gaining prominence, the need to be able to manage the code better led to modules.
With this, JavaScript codes can be divided into modules which then can be imported as and when required.

### Creating a Module
A module allows only specific variables and functions to be accessed outside it. These variables and functions have the export statement prefixed to them.

```
// file "module.js"
export var someVar = "Some data";

export function someFunc() {
    return " for output";
}

// this has no "export" prefixed hence cannot be used outside this module 
function someOtherFunction() {
    return 1;
}
```
### Using a Javascript Module inside a Module Script Tag

The import statement is used to import variables and functions exported by an module into the script that plans on using it.

Any <script> tag in HTML wanting to import a module needs have the attribute type="module".

In the below example the module that is created in the above snippet is imported using the import statement.

```
<script type="module">
    import {someVar, someFunc} from './module.js';

    // "Some data for output"
    console.log(someVar + someFunc());
</script>
```
### Module Scripts are Deferred By the Browser
A script tag of type="module", whether inline or external is always deferred by the browser (regardless of the fact whether defer attribute is used or not).

It is loaded in parallel by the browser, not impacting the webpage load time. Once loaded,
it waits for the DOM to get ready, and then the script is executed. The page suffers no performance penalty as such.
