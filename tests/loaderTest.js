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
            mockery.registerMock('./z/lib/foo.js', {foo: "bar"});
            mockery.registerMock('./z/lib/bar.js', {foo: "bar"});
            mockery.registerMock('./a-b/c/lib/bar.js', {foo: "bar"});
            mockery.registerMock('simple', {foo: "bar"});
        });
        it("should load into container", function () {
            var container = {};

            loader.load(container, ["./z/lib/foo.js"]);
            assert.isOk(container.z.lib.foo, "module is loaded into correct place");
            assert.deepEqual(container.z.lib.foo, {foo: "bar"});

            loader.load(container, ["./z/lib/bar.js"]);
            assert.isOk(container.z.lib.bar, "module is loaded into correct place");
            assert.deepEqual(container.z.lib.bar, {foo: "bar"});

            loader.load(container, ["./a-b/c/lib/bar.js"]);
            assert.isOk(container["a-b"].c.lib.bar, "module is loaded into correct place");
            assert.deepEqual(container["a-b"].c.lib.bar, {foo: "bar"});

            loader.load(container, ["simple"]);
            assert.isOk(container.simple, "module is loaded into correct place");
            assert.deepEqual(container.simple, {foo: "bar"});
        });
        after(function () {
            mockery.deregisterAll();
            mockery.disable();
        });
    });
});