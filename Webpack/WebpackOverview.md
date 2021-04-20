 ### source
    https://medium.com/js-imaginea/webpack-why-and-what-4948433cc2d3#:~:text=The%20motivations%20behind%20webpack%20is,assets%20before%20they%20get%20bundled.
 ### What is webpack?
In its broadest definition: Webpack is a bundler.
For the pedantic , it’s a module bundler. (We’ll get to the module part in a second).
So what webpack basically does is it bundles all your assets and files into , well, bundles.

## But why do I need a bundler? Why can’t I just drop a script in my page?

We most certainly can, but that might lead to a problem or two in the future.
Suppose you have a script for your page. It’s about say, 500 lines of JS. No problem, I guess. We just drop the old script tag in our page.

But then we start adding more functionality to the page, and before you know it, your single script file contains 20k lines of code. Yes problem.
Managing all that code in one file is not exactly going to do any good to your stress levels. Add to that, multiple people working on the same file simultaneously.

So what do we do next? Easy. we split the code into different parts, and break our huge file into 20 smaller files, and insert the 20 <script> tags in our page. 
In a carefully chosen order of course, because you have to make sure that that utility function is available before you try to use it.
So now we have 20 script tags in our page, carefully inserted in a particular order. Not an ideal situation to be in, especially when you need to 
keep making changes in the files, and make sure the changes are made in the correct files to keep the order working.
We can write a script to concatenate all our files in one script tag, and throw that script tag into our file, but we’ll still 
need to ensure the correct order of the files to be concatenated, and will need to monitor the code updates in the existing files, 
or if any additional files need to be added, and then their order….
Long story short, our problems don’t seem to go away with this approach.
  
We see that just concatenating all the files in the correct order is not doing us much good.
A better approach would be if somehow each file could tell us what other files it requires ( it’s dependencies) and then we can include that mapping 
in our earlier concatenation approach.

This is where webpack steps in.

There are mechanisms for specifying dependencies and imports in ES6 and nodeJS.
Webpack uses these mechanisms to build a dependency graph of all the files and their dependencies, and bundle all the files.
The details of how webpack does the bundling requires steps like adding a little boilerplate code before and after each file, and converting it in
a set of functions, and then executing these functions in a controlled mannert.

However, I’ll try to give a fifty thousand feet view of how the webpack bundling works.
You specify an entry file in the webpack configuration , and the process starts from there.
Webpack goes through the dependencies of each file recursively, and resolves every dependency until the traversal has completed.
The resolver first verifies if the respective files for all the dependencies are present. If they are, it transforms every file in a module,
and creates a dependency graph of all the modules.
Then it bundles all of this in one file ( specified as the ‘output’ file in the configuration).
It maintains a registry of all the modules, so they can be correctly called/executed whenever they are required.

## Loaders

The motivations behind webpack is to gather all your dependencies, which includes not just code, but other assets as well, and generate a dependency graph.
Bundlers are only prepared to handle JS files, so webpack needs to preprocess all the other files and assets before they get bundled. 
This is where Loaders come into the picture.
Webpack supports a large variety of formats through loaders.
According to the official documentation, "Loaders are transformations that are applied on the source code of a module."
Basically loaders allow you to do a number of things like transform files from a different language to javascript, or inline images as data URLs.
Loaders even allow you to do things like import CSS files directly from your JavaScript modules.
This is how we use loaders:
```{
test: /\.css$/,
use: [“style-loader”, “css-loader”],
}
```

Here,we are testing if the file is a css file, and if it is, we are using the css-loader and the style-loader to transform the file
before bundling it ( webpack applies the loaders in order from right to left)
The way a loader gets matched against a resolved file can be configured in multiple ways, including by file type and by location within the file system.
Webpack’s flexibility even allows you to apply a specific transformation to a file based on where it was imported into the project.
Apart from creating a dependency graph, and bundling the modules, webpack can perform a number of tasks.
Webpack gives you control over how to treat different assets it encounters. For example, you can decide to inline assets to 
your JavaScript bundles to avoid requests. Webpack also allows you to use techniques like CSS Modules to couple styling with components, 
and to avoid issues of standard CSS styling. This flexibility is what makes webpack so valuable.
Apart from all the functionalities provided out of the box by loaders, we can perform a lot of advanced tasks through Plugins.
Plugins can intercept runtime events supplied by webpack. Webpack provides hooks for all the runtime events. And we can tap into these hooks to do a lot of things
A good example would be bundle extraction performed by the ExtractTextPlugin which, when used with a loader, extracts CSS files 
out of the bundle and into a separate file. Without this step, CSS would be inlined inPlugins can intercept runtime events supplied by webpack. 
A good example is bundle extraction performed by the ExtractTextPlugin which, when used with a loader, extracts CSS files out of the bundle and into a 
separate file. Without this step, CSS would be inlined in the resulting JavaScript, as webpack treats all code as JavaScript by default.
At its core, webpack relies on configuration. Here is a sample configuration that covers to main point

```const webpack = require("webpack");
module.exports = {
  // Where to start bundling
  entry: {
    app: "./entry.js",
  },
// Where to output
  output: {
    // Output to the same directory
    path: __dirname,
// Capture name from the entry using a pattern
    filename: "[name].js",
  },
// How to resolve encountered imports
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
// What extra processing to perform
  plugins: [
    new webpack.DefinePlugin({ ... }),
  ],
// Adjust module resolution algorithm
  resolve: {
    alias: { ... },
  },
};
```

To wrap up, Webpack is a great tool which can be easily used out of the box to automatically load and bundle
  CSS and other files and assets in addition to JS , with the help of an easy to set up config file. And at the same time, 
  offers the users the freedom to perform much more complex tasks with its vast configurable options, and plugins.



