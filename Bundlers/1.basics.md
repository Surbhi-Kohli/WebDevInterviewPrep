
# Bundlers (Webpack, Rollup, Parcel, Vite)

## What is a Bundler?

A bundler is a **build tool** that takes an application's source code and produces **browser-ready static assets**.

Developers write applications using:

* JavaScript modules
* TypeScript
* JSX
* SCSS/SASS
* Images
* Fonts
* CSS
* JSON

A bundler processes these resources and outputs optimized files that browsers can directly load.

```text
Developer Code
        │
        ▼
     Bundler
        │
        ▼
Browser Ready Files
```

Examples:

* Webpack
* Rollup
* Parcel
* Vite (uses Rollup for production)
* esbuild

---

# Why do we need a bundler?

Browsers understand

* HTML
* CSS
* JavaScript
* Images
* Fonts

So why do we need bundlers?

Because modern applications are much more than plain JavaScript.

Developers write

```tsx
import Button from "./Button";
import "./App.scss";
import logo from "./logo.png";

const App = () => {
    return <Button />;
};
```

The browser cannot directly understand

* JSX
* TypeScript
* SCSS
* CSS imported from JS
* Build optimizations
* Dependency resolution

A bundler converts these into browser-ready assets.

---

# High Level Build Process

```text
Entry File
    │
Dependency Resolution
    │
Dependency Graph
    │
Bundling (Packing)
    │
Transpile
    │
Tree Shaking
    │
Code Splitting
    │
Minification
    │
Asset Optimization
    │
Output (Static Assets)
```

---

# Step 1 — Entry File

Webpack starts from one or more entry files.

Example

```text
src/
    index.js
```

```js
import App from "./App";
```

Initially webpack only knows about

```
index.js
```

Everything else must be discovered.

---

# Step 2 — Dependency Resolution

Webpack recursively follows every import.

Example

```text
index.js
    │
    ▼
App.js
    │
 ├── Header.js
 ├── Footer.js
 └── Dashboard.js
        │
        ├── Chart.js
        └── api.js
```

Webpack opens every imported file until there are no more imports.

This process is called

> Dependency Resolution

---

# Step 3 — Dependency Graph

The discovered files become a graph.

```text
index
   │
App
├── Header
├── Footer
└── Dashboard
      ├── Chart
      └── api
```

---

## Why build a dependency graph?

Without it webpack cannot know

* which files belong to the application
* which files are unused
* module execution order
* what can be lazy loaded
* what needs rebuilding

It powers

* bundling
* tree shaking
* code splitting
* incremental builds
* execution order

---

## Why not bundle every file inside src?

Suppose

```text
src

App.js

Header.js

OldComponent.js

Experiment.js

unused.js
```

Only App.js is imported.

Bundling everything would include

* experiments
* dead code
* unused modules

The dependency graph ensures only reachable files are included.

---

# Step 4 — Bundling (Packing)

After dependency resolution webpack creates browser-ready bundles.

Imagine

```text
App.js

Header.js

Footer.js

utils.js
```

Instead of keeping separate files webpack packages them together.

Conceptually

```js
(function(modules){

    function __webpack_require__(){}

})();
```

Everything now lives inside one or more bundle files.

---

## What does bundling actually do?

It

* combines modules
* injects module runtime
* replaces imports
* generates executable JavaScript

Instead of

```js
import { add } from "./math";
```

Webpack internally creates something conceptually similar to

```js
const math = __webpack_require__(1);
```

The browser never sees the original import.

---

# Why inject **webpack_require**?

Originally

```text
App.js

↓

imports

↓

utils.js
```

After bundling

there are no files anymore.

Webpack therefore creates its own module loader.

```text
bundle.js

Module 0

Module 1

Module 2

+

__webpack_require__()
```

This runtime loads modules from inside the bundle.

---

# Why inject module.exports?

Every module must expose values.

Conceptually

```js
exports.add = function(){}
```

Other bundled modules can retrieve those exports through

```js
__webpack_require__()
```

---

# What does a bundle look like?

Conceptually

```js
(function(modules){

    function require(id){

        ...

    }

    require("./index.js");

})({

 "./index.js": function(){},

 "./math.js": function(){}

});
```

Notice

There are

* no separate files
* no imports
* modules become functions

---

# Why do we Transpile?

Developers write languages browsers cannot execute.

Example

TypeScript

```ts
interface User{
    name:string
}
```

↓

```js
const user={}
```

Example

JSX

```jsx
<Button />
```

↓

```js
React.createElement(Button)
```

Example

SCSS

```scss
$color: blue;
```

↓

```css
color: blue;
```

### Definition

Transpilation converts developer-friendly source code into browser-understandable code.

---

# Why Minify?

Readable code

```js
function calculateTotal(price,tax){
    return price+tax;
}
```

↓

```js
function a(b,c){return b+c}
```

Removes

* spaces
* comments
* unnecessary characters
* long variable names

Purpose

Reduce download size.

Minification changes appearance, not behavior.

---

# Why Code Splitting?

Suppose your application contains

```text
Home

Dashboard

Admin

Settings
```

Should Home download Admin?

No.

Instead webpack generates

```text
main.js

dashboard.chunk.js

admin.chunk.js

settings.chunk.js
```

Initially

```text
Browser

↓

main.js
```

Later

```text
User clicks Dashboard

↓

GET dashboard.chunk.js
```

Only the required code downloads.

---

## What is a Chunk?

A chunk is simply

> A separate JavaScript bundle containing part of the application.

Webpack divides the application into chunks.

```text
Whole App

↓

Chunk A

Chunk B

Chunk C
```

Each chunk becomes its own JS file.

---

## How are chunks created?

Usually through dynamic imports.

```js
const Dashboard = React.lazy(() =>
    import("./Dashboard")
);
```

Webpack understands

This module can be loaded later.

---

# Why Optimize Assets?

Assets include

* images
* CSS
* fonts
* SVG
* videos

Webpack can

* compress
* resize
* minify
* hash filenames
* remove duplicates

Example

```text
logo.png

2MB
```

↓

```text
logo.8ad12f.png

500KB
```

---

# Why are output files called Static Assets?

Webpack documentation shows

```text
Source Modules

↓

Webpack

↓

Static Assets
```

Static asset means

> A file ready to be served directly by the web server.

Example

```text
dist/

main.js

styles.css

logo.png
```

The server simply returns them.

No compilation happens anymore.

---

## Why are JS files also static assets?

Because webpack has already transformed them.

Original

```tsx
<Button />
```

↓

Output

```js
React.createElement(...)
```

Now they are browser-ready files.

---

# Why hash filenames?

Example

Instead of

```text
logo.png
```

Webpack generates

```text
logo.f91d3a.png
```

The hash comes from the **content** of the file.

---

## Why?

Browsers cache resources.

Suppose

```text
logo.png
```

is cached.

Tomorrow you replace the image.

Browser says

"I already have logo.png."

Old image is shown.

---

With hashing

Old

```text
logo.f91d3a.png
```

New

```text
logo.6bc2e1.png
```

Browser notices

Different filename.

Downloads new image.

---

# When does the hash change?

Not when you deploy.

It changes only if the file content changes.

Example

Deployment 1

```text
logo.f91d3a.png
```

Deployment 2

Same image

```text
logo.f91d3a.png
```

Same filename.

No download.

---

If the image changes

```text
logo.f91d3a.png

↓

logo.6bc2e1.png
```

Browser downloads only the changed file.

This technique is called

> Content Hashing

and enables

> Long-Term Browser Caching.

---

# Build Example

Source

```text
App.tsx

↓

imports

↓

Dashboard.tsx

↓

imports

↓

Chart.tsx
```

Build process

```text
Entry

↓

Dependency Resolution

↓

Dependency Graph

↓

Transpile

↓

Tree Shake

↓

Code Split

↓

Minify

↓

Optimize Assets

↓

Generate

main.9f13ab.js

dashboard.chunk.2bc91f.js

styles.781bc.css

logo.f91d3a.png
```

---

# Webpack Runtime

Webpack doesn't simply concatenate files.

It injects a runtime.

Conceptually

```js
(function(modules){

    function __webpack_require__(id){

        ...

    }

    __webpack_require__(0);

})();
```

The runtime

* loads modules
* caches modules
* resolves dependencies
* executes entry module

---

# ESM vs CommonJS

Source

ESM

```js
import { add } from "./math";
```

CommonJS

```js
const math = require("./math");
```

Webpack parses both.

Internally they both become nodes in the dependency graph.

Eventually webpack generates similar runtime code.

---

## Why is ESM preferred?

ESM imports are static.

```js
import { add } from "./math";
```

Webpack knows the dependency during build time.

CommonJS

```js
require(moduleName)
```

may depend on runtime values.

Static imports enable

* tree shaking
* better optimization
* better code splitting

---

# Comparison

| Tool    | Best For                                                 |
| ------- | -------------------------------------------------------- |
| Webpack | Large enterprise applications, highly configurable       |
| Parcel  | Zero configuration projects                              |
| Rollup  | Libraries and npm packages                               |
| Vite    | Modern frontend development (uses Rollup for production) |
| esbuild | Extremely fast builds and transpilation                  |

---

# Important Interview Definitions

### Bundler

A build tool that processes an application's source modules, resolves dependencies, and generates optimized browser-ready static assets.

---

### Dependency Resolution

The process of recursively discovering every imported module starting from the entry file.

---

### Dependency Graph

A graph representing every module and the relationships between them. It enables bundling, tree shaking, code splitting, and efficient rebuilds.

---

### Bundling (Packing)

Combining application modules into one or more browser-executable bundles while injecting a runtime to resolve module dependencies.

---

### Transpilation

Converting source code such as TypeScript, JSX, or SCSS into code that browsers understand.

---

### Minification

Reducing file size by removing unnecessary characters and shortening identifiers without changing functionality.

---

### Code Splitting

Dividing an application into smaller bundles (chunks) that are downloaded on demand instead of all at once.

---

### Chunk

A separate JavaScript bundle containing a portion of the application, typically created through dynamic imports or optimization.

---

### Static Asset

A browser-ready file (JavaScript, CSS, image, font, etc.) that can be served directly by the web server.

---

### Content Hashing

Generating filenames based on the content of output files so browsers can cache unchanged files and automatically fetch updated ones when the content changes.

---

# Mental Model (Remember This)

```text
Developer writes

TypeScript
React JSX
SCSS
Modern JS
Images
Fonts
        │
        ▼
    Bundler
        │
        ├── Read entry
        ├── Resolve dependencies
        ├── Build dependency graph
        ├── Bundle modules
        ├── Transpile
        ├── Tree shake
        ├── Split code into chunks
        ├── Minify
        ├── Optimize assets
        ├── Add content hashes
        ▼
Browser-ready Static Assets

main.9f13ab.js
dashboard.chunk.2bc91f.js
styles.781bc.css
logo.f91d3a.png
```

These notes cover the complete lifecycle of a modern bundler from the moment it receives an entry file to the generation of optimized, cache-friendly static assets that the browser can execute. They also capture the reasoning behind each step, which is exactly what interviewers tend to probe.
