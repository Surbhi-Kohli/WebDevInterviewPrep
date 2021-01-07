/***  TREE SHAKING
Source- https://medium.com/@netxm/what-is-tree-shaking-de7c6be5cadd
When we import and export modules in JavaScript, most of the time there is unused code floating around. Tree shaking or 
dead code elimination means that unused modules will not be included in the bundle during the build process.
Tools like webpack will detect dead code and mark it as “unused module” but it won’t remove the code. Webpack relies on minifiers 
to cleanup dead code, one of them is UglifyJS plugin, which will eliminate the dead code from the bundle.                      */

// modules.js
export function drive(props) {
 return props.gas
}

export function fly(props) {
 return props.miles 
}

// main.js
import { drive } from modules;

/// some code
eventHandler = (event) => {
  event.preventDefault()
  drive({ gas: event.target.value })
}
/// some code

// fly() was never importent and won't be included in our bundle
/*It only works with import and export. It won’t work with CommonJS require syntax. 
Same applies to npm dependencies. great example is lodash, just import pick from ‘lodash/pick and
your bundle will only include one small module instead of entire lodash library.
Utilizing the tree shaking and dead code elimination can significantly reduce the code size we have in 
our application. The less code we send over the wire the more performant the application will be.*/
