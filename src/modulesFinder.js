"use strict";

var glob = require("glob");

function find(pattern, directory, goDown, callback) {
    glob(
        pattern,
        {
            cwd: directory,
            matchBase: goDown,
            absolute: true
        },
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
     * Find all the local modules available in the specified directory
     *
     * @param directory
     * @param callback
     */
    findAllLocalModules : function (directory, callback) {
        find("*.@(js|json)", directory, true, callback);
    },

    /**
     * Find all the immediate local modules available in the specified directory. 
     * This does not return the local modules residing inside a directory
     *
     * @param directory
     * @param callback
     */
    findImmediateLocalModules: function (directory, callback) {
        find("*.@(js|json)", directory, false, callback);
    }
};

module.exports = modulesFinder;