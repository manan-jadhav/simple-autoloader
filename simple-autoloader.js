"use strict";

var moduleFinder = require("./src/modulesFinder");
var path = require("path");
var loader = require("./src/loader");

var autoloader = {};

var moduleDir = path.dirname(module.parent.filename);

/**
 * Load all modules available in the current directory, excluding child directories.
 */
autoloader.loadLocalModules = function () {
    moduleFinder.findModules(moduleDir, function (modules) {
        loader.load(autoloader, modules);
    });
};

/**
 * Load all modules available in the current directory, including child directories.
 */
autoloader.loadAllLocalModules = function () {
    moduleFinder.findModulesRecursively(moduleDir, function (modules) {
        loader.load(autoloader, modules);
    });
};

/**
 * Load all modules listed in the package.json
 *
 * @param loadDev Load devDependencies defined in package.json
 */
autoloader.loadInstalledModules = function (loadDev) {
    if (!loadDev) {
        loadDev = false;
    }
    moduleFinder.findInstalledModules(moduleDir, loadDev, function (modules) {
        loader.load(autoloader, modules);
    });
};

/**
 * Load a module, or an array of modules
 * 
 * @param modules List of all modules to load
 */
autoloader.load = function (modules) {
    if (!Array.isArray(modules)) {
        modules = [modules];
    }
    loader.load(autoloader, modules);
};

module.exports = autoloader;