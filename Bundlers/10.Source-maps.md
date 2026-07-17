# Source Maps — Consolidated Notes

## 1. What is a source map?

A **source map** is a file that connects the code executed by the browser back to the original source code written by the developer.

During a production build, your original code may be:

* bundled
* transpiled
* minified
* renamed
* combined with other modules

For example, you write:

```tsx
// src/components/Checkout.tsx

function calculateTotal(price: number, tax: number) {
  return price + tax;
}
```

The production bundle may become:

```js
function a(b,c){return b+c}
```

The browser executes this generated code, not the original TypeScript file.

If an error occurs, the browser may report:

```text
main-a81bc.js:1:18472
```

That location is difficult to understand.

A source map allows tools to translate it back to something useful:

```text
src/components/Checkout.tsx:4:10
```

The core mapping is:

```text
Generated production code
main-a81bc.js:1:18472

        ↓ source map

Original source code
src/components/Checkout.tsx:4:10
```

---

# 2. Why are source maps needed?

Production JavaScript is optimized for machines, not humans.

Original code:

```js
function calculateDiscount(price, percentage) {
  const discount = price * percentage;
  return price - discount;
}
```

Minified code:

```js
function a(b,c){return b-b*c}
```

Without a source map, an error may look like:

```text
TypeError at main-a81bc.js:1:27834
```

With a source map, developer tools can show:

```text
TypeError at src/pricing/calculateDiscount.js:3:18
```

Source maps make it possible to debug production-style code using the original:

* JavaScript
* TypeScript
* JSX or TSX
* Vue components
* source modules
* original line and column numbers

---

# 3. Who generates source maps?

The **build tools that transform the code** generate source maps.

This may include:

* bundlers
* transpilers
* minifiers
* CSS processors

Examples:

| Tool                | What it may map                             |
| ------------------- | ------------------------------------------- |
| Vite                | Generated bundles back to source modules    |
| Webpack             | Bundled code back to original modules       |
| Rollup              | Output chunks back to source files          |
| Parcel              | Generated assets back to source files       |
| esbuild             | Transformed and bundled code back to source |
| Babel               | Transpiled JavaScript back to modern source |
| TypeScript compiler | JavaScript back to TypeScript               |
| Terser              | Minified code back to pre-minified code     |
| Sass                | Generated CSS back to `.scss` files         |

Usually the bundler coordinates the full process and emits the final source map.

---

# 4. What does a source map file look like?

Suppose the production build creates:

```text
dist/assets/
├── main-a81bc.js
└── main-a81bc.js.map
```

The `.map` file contains JSON similar to:

```json
{
  "version": 3,
  "file": "main-a81bc.js",
  "sources": [
    "../../src/main.tsx",
    "../../src/App.tsx",
    "../../src/components/Checkout.tsx"
  ],
  "sourcesContent": [
    "...original source code...",
    "...original source code...",
    "...original source code..."
  ],
  "names": [
    "calculateTotal",
    "price",
    "tax"
  ],
  "mappings": "AAAA,SAASA..."
}
```

The important fields are:

* `file`: generated file associated with the map
* `sources`: original source files
* `sourcesContent`: optional copies of original source code
* `names`: original variable and function names
* `mappings`: encoded generated-to-original position mappings

You generally do not read the `mappings` field manually. Developer tools decode it.

---

# 5. How is the generated JavaScript connected to its source map?

The generated JavaScript may contain a comment at the end:

```js
//# sourceMappingURL=main-a81bc.js.map
```

This tells the browser:

```text
The source map for this JavaScript file is:
main-a81bc.js.map
```

The flow is:

```text
Browser loads main-a81bc.js
        ↓
Developer tools see sourceMappingURL
        ↓
Developer tools request main-a81bc.js.map
        ↓
Map translates generated positions
        ↓
Original source appears in DevTools
```

A source map can also be embedded directly into the JavaScript as a data URL, though separate `.map` files are common for production builds.

---

# 6. Where are source maps stored?

There are several common approaches.

## Option 1: Stored beside production assets

```text
dist/
└── assets/
    ├── main-a81bc.js
    ├── main-a81bc.js.map
    ├── dashboard-f91ac.js
    └── dashboard-f91ac.js.map
```

They are deployed to the same web server or CDN as the JavaScript.

Advantages:

* browser DevTools can load them automatically
* easy production debugging

Disadvantage:

* they may expose original source code to anyone who can access them

---

## Option 2: Generated locally but not publicly deployed

```text
build-output/
├── main-a81bc.js
└── main-a81bc.js.map
```

The JavaScript is deployed publicly, but the `.map` file is stored privately.

For example, it may be:

* uploaded to Sentry
* uploaded to another monitoring service
* stored in CI build artifacts
* stored in a private object-storage bucket
* kept in an internal release system

This is a common production setup.

The browser cannot use the map publicly, but the monitoring service can use it to translate stack traces.

---

## Option 3: Inline source maps

The map is embedded inside the generated JavaScript:

```js
//# sourceMappingURL=data:application/json;base64,...
```

This is convenient during development but increases the JavaScript file size.

It is usually not preferred for large production bundles.

---

# 7. Who uses source maps?

## Browser developer tools

Chrome DevTools, Firefox Developer Tools and similar tools use source maps.

Instead of showing:

```text
main-a81bc.js
```

they may show:

```text
src/
├── App.tsx
└── components/
    └── Checkout.tsx
```

You can then:

* set breakpoints in original files
* inspect original variable names
* view readable stack traces
* step through TypeScript or JSX
* debug bundled modules

The browser still executes the generated JavaScript. DevTools only presents the original source representation.

---

## Error-monitoring services

Examples include:

* Sentry
* Datadog
* Rollbar
* Bugsnag
* New Relic

Suppose a production browser sends this error:

```text
TypeError: Cannot read properties of undefined
at main-a81bc.js:1:18472
```

The monitoring platform uses the uploaded source map and converts it into:

```text
TypeError: Cannot read properties of undefined
at Checkout.tsx:42:15
```

This process is often called:

```text
symbolication
```

or:

```text
de-minification
```

For JavaScript, “source-map resolution” is also a common description.

---

## Developers and support engineers

Developers use the translated stack traces to understand:

* which original file failed
* which original function failed
* the correct line and column
* which release introduced the problem

Without source maps, debugging minified production errors can be extremely difficult.

---

# 8. Does the browser need source maps to run the application?

No.

The browser runs:

```text
main-a81bc.js
```

The source map is not required for application execution.

It is only debugging metadata.

Therefore:

```text
Application without source map
        ↓
Still works normally

Developer debugging
        ↓
Much harder
```

If a `.map` file is missing, the JavaScript can still execute.

---

# 9. Vite source-map configuration

In Vite, production source maps can be enabled in:

```text
vite.config.js
```

or:

```text
vite.config.ts
```

Example:

```ts
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    sourcemap: true
  }
});
```

Then a build may produce:

```text
dist/assets/
├── index-a81bc.js
└── index-a81bc.js.map
```

Common Vite values include:

```ts
build: {
  sourcemap: true
}
```

Generates normal source-map files and references them from the generated bundles.

```ts
build: {
  sourcemap: "hidden"
}
```

Generates the `.map` files but does not add the public `sourceMappingURL` comment to the JavaScript.

This is useful when source maps are uploaded privately to an error-monitoring service.

```ts
build: {
  sourcemap: "inline"
}
```

Embeds the source map into the JavaScript itself.

For most production monitoring setups, a hidden or privately uploaded map is often preferred.

---

# 10. Webpack source-map configuration

Webpack uses the `devtool` option.

Example:

```js
module.exports = {
  mode: "production",
  devtool: "source-map"
};
```

This generates external `.map` files.

A production setup might instead use:

```js
module.exports = {
  mode: "production",
  devtool: "hidden-source-map"
};
```

That generates source maps without exposing the source-map URL in the JavaScript bundle.

Webpack has many source-map modes because there are trade-offs between:

* build speed
* map accuracy
* output size
* development versus production use

---

# 11. Source maps in development

Development tools commonly generate source maps automatically.

For example:

```text
src/App.tsx
        ↓
Vite transforms JSX and TypeScript
        ↓
Browser executes JavaScript
        ↓
DevTools still shows App.tsx
```

Development source maps prioritize:

* fast rebuilds
* useful line numbers
* debugging convenience

Production source maps prioritize:

* accurate production stack traces
* manageable build size
* controlled source-code exposure

---

# 12. Are source maps a security risk?

Source maps do not directly make the application executable in a new way, but publicly accessible maps may reveal:

* original source filenames
* source code
* comments
* internal function names
* application structure
* API-related implementation details

They should never contain secrets in the first place.

Secrets must not be included in frontend code, with or without source maps, because frontend bundles are sent to users.

Companies commonly choose one of these approaches:

```text
Public source maps
```

Useful for direct browser debugging.

```text
Private source maps
```

Uploaded only to monitoring tools.

```text
No production source maps
```

More private, but production debugging becomes harder.

A frequent compromise is:

```text
Generate source maps
        ↓
Upload them to Sentry or another monitoring system
        ↓
Do not publish them on the public CDN
```

---

# 13. Why must source maps match the exact build?

Suppose version 1 creates:

```text
main-a81bc.js
main-a81bc.js.map
```

Version 2 creates:

```text
main-f91da.js
main-f91da.js.map
```

The version 1 map cannot reliably decode errors from version 2.

The generated code positions may be completely different.

Therefore monitoring systems commonly associate source maps with:

* a release ID
* a build version
* a Git commit
* a deployment version
* the exact hashed asset filename

The required relationship is:

```text
Generated file
main-a81bc.js

must use

Matching source map
main-a81bc.js.map
```

---

# 14. Source map versus manifest

These are different build files.

## Manifest

Maps a logical entry to an emitted asset:

```text
src/main.tsx
        ↓
assets/main-a81bc.js
```

Used to locate production assets.

Usually used by:

* backend servers
* SSR frameworks
* build and deployment tools

---

## Source map

Maps generated code positions to original source positions:

```text
assets/main-a81bc.js:1:18472
        ↓
src/App.tsx:42:15
```

Used for debugging.

Usually used by:

* browser DevTools
* Sentry
* Datadog
* developers

The easiest distinction is:

> **Manifest:** Which generated file should I load?

> **Source map:** Where did this generated code come from?

---

# 15. Complete source-map flow

```text
Developer writes TypeScript/React
        ↓
Bundler/transpiler transforms code
        ↓
Minifier compresses code
        ↓
Production JavaScript is generated
        ↓
Source map is generated
        ↓
JavaScript and map are deployed
or map is uploaded privately
        ↓
An error occurs in production bundle
        ↓
Browser or monitoring tool reads the map
        ↓
Generated line and column are translated
        ↓
Developer sees original file and location
```

---

# Interview Summary

A source map is build-generated debugging metadata that maps bundled, transpiled or minified code back to the original source files.

The bundler, transpiler or minifier generates it during the build. It may be stored beside the generated JavaScript in `dist/`, embedded in the JavaScript, kept as a CI artifact or uploaded privately to an error-monitoring platform.

The browser does not need source maps to execute the application. Browser DevTools and monitoring systems use them to translate unreadable production locations such as:

```text
main-a81bc.js:1:18472
```

into useful original locations such as:

```text
src/components/Checkout.tsx:42:15
```

Source maps must match the exact production build, which is why they are commonly associated with a release, commit or hashed asset filename.
