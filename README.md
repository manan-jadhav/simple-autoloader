#Simple Autoloader `v0.2.0`

#### Simple module autoloader for Node.js
[![Build Status](https://travis-ci.org/CurosMJ/simple-autoloader.svg?branch=master)](https://travis-ci.org/CurosMJ/simple-autoloader)

### Installation
`npm install simple-autoloader --save`

### Usage

#### Autoloading
There are four methods available for autoloading :
- loadLocalModules() : Load all modules (js and json files) present in the current directory
- loadAllLocalModules() : Load all modules available in current directory (except node_modules) and its child directories recursively.
- loadInstalledModules(loadDevDependencies = false) : Load all dependencies defined in package.json. Pass `true` in loadDevDependencies to load devDependencies also.
- load([modules]) : Load modules provided in the array

```js
var modules = require("simple-autoloader");

// Autoloading Modules

// Load all modules (js and json files) present in the current directory
modules.loadLocalModules();

// Load all modules available in current directory (except node_modules)
// and its child directories recursively.
modules.loadAllLocalModules();

// Load all dependencies defined in package.json
modules.loadInstalledModules();

// Load devDependencies also
modules.loadInstalledModules(true);

// Load specified modules
modules.load(['gulp', 'jade']);

```

#### Accessing Autoloaded Modules

```js
var modules = require("simple-autoloader");

modules.loadAllLocalModules();
modules.load(['gulp', 'jade']);

// Reference to the gulp module
modules.gulp;


// Reference to the jade module
modules.jade;

/*

Assume you have the following directory structure:
index.js (the current file)
lib/
    a.js
    b.js
src/
    a.js
z.js

*/

// Using ./lib/a.js
modules.lib.a;

// Using ./lib/b.js
modules.lib.b;

// Using ./src/a.js
modules.src.a;

// Using ./z.js
modules.z;
```


