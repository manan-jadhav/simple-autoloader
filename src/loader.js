"use strict";

var path = require("path");

var loader = {
    /**
     * Load the modules into the container
     *
     * @param container
     * @param modules
     */
    load : function (container, modules) {
        var i, module, loadKey, dotPosition;
        for (i = 0; i < modules.length; i++) {
            module = modules[i];

            loadKey = path.basename(module);
            dotPosition = loadKey.lastIndexOf(".");

            if (dotPosition > 0) {
                loadKey = loadKey.substring(0, dotPosition);
            }

            container[loadKey] = require(module);
        }
    }
};

module.exports = loader;