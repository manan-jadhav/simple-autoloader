"use strict";

var glob = require("glob");
var fs = require("fs");
var path = require("path");

function find(pattern, directory, callback) {
    glob(
        pattern,
        {cwd: directory},
        function (err, files) {
            if (!err) {
                callback(files);
            } else {
                throw err;
            }
        }
    );
}

var modulesFinder = {
    /**
     * Find all the modules available in the specified directory, 
     * and its child directories except the 'node_modules' directory.
     *
     * @param directory
     * @param callback
     */
    findModulesRecursively : function (directory, callback) {
        find("{!(node_modules)/**/@(*.js|!(package).json),@(*.js|!(package).json)}", directory, callback);
    },

    /**
     * Find all the modules available in the specified directory
     *
     * @param directory
     * @param callback
     */
    findModules: function (directory, callback) {
        find("@(*.js|!(package).json)", directory, callback);
    },

    /**
     * Reads the package.json and loads all modules listed in it
     *
     * @param directory
     * @param devModules
     * @param callback
     */
    findInstalledModules: function (directory, devModules, callback) {
        fs.readFile(path.join(directory, "package.json"), function (err, data) {
            if (!err) {
                var packageFile = JSON.parse(data), modules = [];
                if (packageFile.dependencies) {
                    modules = modules.concat(Object.keys(packageFile.dependencies));
                }
                if (devModules && packageFile.devDependencies) {
                    modules = modules.concat(Object.keys(packageFile.devDependencies));
                }
                callback(modules);
            } else {
                throw err;
            }
        });
    }
};

module.exports = modulesFinder;