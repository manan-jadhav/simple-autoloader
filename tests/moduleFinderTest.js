"use strict";

var before = require("mocha").before;
var after = require("mocha").after;
var describe = require("mocha").describe;
var it = require("mocha").it;
var assert = require("chai").assert;
var mockFs = require("mock-fs");


describe("moduleFinder Tests", function () {
    describe('finding local modules', function () {
        before(function () {
            mockFs({
                'package.json': JSON.stringify({
                    dependencies: {"test_package": "1.1.1"},
                    devDependencies: {"another_package": "1.2.3"}
                }),
                node_modules: {
                    test_package: {
                        'index.js': 'contents'
                    },
                    another_package: {
                        'index.js': 'contents'
                    }
                },
                lib: {
                    src: {
                        'file-1.js': 'module.exports = {foo:"bar"}',
                        'file-2.js': 'module.exports = {foo:"bar"}',
                        'file-3.json': '{foo:"bar"}',
                        'file-4.txt': 'This file should not be loaded',
                        'file-5.xyz': 'This file should not be loaded'
                    }
                }
            });
        });
        it('should find local modules', function (done) {
            var modulesFinder = require("../src/modulesFinder");

            modulesFinder.findModulesRecursively('./', function (files) {
                assert.lengthOf(files, 3, "three matching modules are found");
                assert.match(files[0], /file-1\.js$/, 'file-1.js is found');
                assert.match(files[1], /file-2\.js$/, 'file-2.js is found');
                assert.match(files[2], /file-3\.json$/, 'file-3.json is found');
                done();
            });
        });
        it('should provide existing absolute paths', function (done) {
            var modulesFinder = require("../src/modulesFinder"), fs = require("fs"), path = require("path");

            modulesFinder.findModulesRecursively('./', function (files) {
                assert.lengthOf(files, 3, "three matching modules are found");

                assert.isOk(fs.existsSync(files[0]));
                assert.isOk(fs.existsSync(files[1]));
                assert.isOk(fs.existsSync(files[2]));
                done();
            });
        });

        it('should find immediate local modules', function (done) {
            var modulesFinder = require("../src/modulesFinder");

            modulesFinder.findModules('./', function (files) {
                assert.lengthOf(files, 0, "no modules are found");
                done();
            });
        });

        it('should find immediate local modules', function (done) {
            var modulesFinder = require("../src/modulesFinder");

            modulesFinder.findModulesRecursively('./lib/src', function (files) {
                assert.lengthOf(files, 3, "three modules are found");
                done();
            });
        });

        it('should find installed modules', function (done) {
            var modulesFinder = require("../src/modulesFinder");

            // Only dependencies
            modulesFinder.findInstalledModules('./', false, function (modules) {
                assert.lengthOf(modules, 1, "one module is found");
                assert.equal(modules[0], 'test_package');
                done();
            });
        });

        it('should find installed dev modules', function (done) {
            var modulesFinder = require("../src/modulesFinder");

            // with dev dependencies
            modulesFinder.findInstalledModules('./', true, function (modules) {
                assert.lengthOf(modules, 2, "two modules are found");
                assert.equal(modules[0], 'test_package');
                assert.equal(modules[1], 'another_package');
                done();
            });
        });
        after(function () {
            mockFs.restore();
        });
    });
});