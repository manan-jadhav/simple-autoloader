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
        var i, j, module, loadKey, loadReference, dotPosition, directories, pathSegment;
        for (i = 0; i < modules.length; i++) {
            module = modules[i];

            directories = module.split("/");
            loadReference = container;

            for (j = 0; j < directories.length - 1; j++) {
                pathSegment = directories[j];
                if (pathSegment !== "." && pathSegment !== "") {
                    if (!loadReference[pathSegment]) {
                        loadReference[pathSegment] = {};
                    }
                    loadReference = loadReference[pathSegment];
                }
            }

            loadKey = path.basename(module);
            dotPosition = loadKey.lastIndexOf(".");

            if (dotPosition > 0) {
                loadKey = loadKey.substring(0, dotPosition);
            }

            loadReference[loadKey] = require(module);
        }
    }
};

module.exports = loader;