"use strict";

var before = require("mocha").before;
var after = require("mocha").after;
var describe = require("mocha").describe;
var it = require("mocha").it;
var assert = require("chai").assert;
var mockery = require("mockery");

var loader = require("../src/loader");

describe("moduleFinder Tests", function () {
    describe('finding local modules', function () {
        before(function () {
            mockery.enable();
            mockery.registerMock('/a/b/c/lib/foo.js', {foo: "bar"});
            mockery.registerMock('/a/b/c/lib/bar.js', {foo: "bar"});
        });
        it("should load into container", function () {
            var container = {};

            loader.load(container, ["/a/b/c/lib/foo.js"]);

            assert.isOk(container["foo"], "module is loaded into correct place");
            assert.isOk(container.foo, "module is loaded into correct place");
            assert.deepEqual(container["foo"], {foo: "bar"});

            loader.load(container, ["/a/b/c/lib/bar.js"]);

            assert.isOk(container["foo"], "module is loaded into correct place");
            assert.isOk(container.foo, "module is loaded into correct place");
            assert.deepEqual(container["foo"], {foo: "bar"});
            assert.isOk(container["bar"], "module is loaded into correct place");
            assert.isOk(container.bar, "module is loaded into correct place");
            assert.deepEqual(container["bar"], {foo: "bar"});
        });
        after(function () {
            mockery.deregisterAll();
            mockery.disable();
        });
    });
});