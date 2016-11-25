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

            modulesFinder.findAllLocalModules('./', function (files) {
                assert.lengthOf(files, 3, "three matching modules are found");
                assert.match(files[0], /file-1\.js$/, 'file-1.js is found');
                assert.match(files[1], /file-2\.js$/, 'file-2.js is found');
                assert.match(files[2], /file-3\.json$/, 'file-3.json is found');
                done();
            });
        });
        it('should provide existing absolute paths', function (done) {
            var modulesFinder = require("../src/modulesFinder"), fs = require("fs"), path = require("path");

            modulesFinder.findAllLocalModules('./', function (files) {
                assert.lengthOf(files, 3, "three matching modules are found");

                assert.isOk(fs.existsSync(files[0]));
                assert.isOk(fs.existsSync(files[1]));
                assert.isOk(fs.existsSync(files[2]));
                done();
            });
        });

        it('should find immediate local modules', function (done) {
            var modulesFinder = require("../src/modulesFinder");

            modulesFinder.findImmediateLocalModules('./', function (files) {
                assert.lengthOf(files, 0, "no modules are found");
                done();
            });
        });

        it('should find immediate local modules', function (done) {
            var modulesFinder = require("../src/modulesFinder");

            modulesFinder.findImmediateLocalModules('./lib/src', function (files) {
                assert.lengthOf(files, 3, "three modules are found");
                done();
            });
        });
        after(function () {
            mockFs.restore();
        });
    });
});