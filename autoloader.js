"use strict";

var moduleFinder = require("./src/modulesFinder");
var path = require("path");
var loader = require("./src/loader");

var autoloader = {};

var moduleDir = path.dirname(module.parent.filename);

/**
 * Load all modules available in the current directory, excluding child directories.
 */
autoloader.loadImmediate = function () {
    moduleFinder.findImmediateLocalModules(moduleDir, function (modules) {
        loader.load(autoloader, modules);
    });
};

/**
 * Load all modules available in the current directory, including child directories.
 */
autoloader.loadAll = function () {
    moduleFinder.findAllLocalModules(moduleDir, function (modules) {
        loader.load(autoloader, modules);
    });
};

/**
 * Load a module, or an array of modules
 * 
 * @param modules
 */
autoloader.load = function (modules) {
    if (!Array.isArray(modules)) {
        modules = [modules];
    }
    loader.load(autoloader, modules);
};

module.exports = autoloader;