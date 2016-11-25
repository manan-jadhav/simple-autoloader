#Simple Autoloader `v0.1.1`
#### Simple module autoloader for Node.js

### Installation
`npm install simple-autoloader --save`

### Usage

```js
var modules = require("simple-autoloader");

// Load all modules available in your current directory
modules.loadImmediate()

// Load all modules available in your current directory
// and child directories
modules.loadAll()

// Load a few selected modules
modules.load(["express", "hapi", "./routes/hello.js"])

//Go ahead and use them !

modules.express.blah();
modules.routes.hello.world();

```

