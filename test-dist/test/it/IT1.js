"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
var chai_1 = require("chai");
var mocha_typescript_1 = require("mocha-typescript");
var get_logger_1 = require("../../main/annotation/get-logger");
var method_anno_1 = require("../../main/annotation/method-anno");
var rv_method_1 = require("../../main/rv/rv-method");
var MyLogger = (function () {
    function MyLogger() {
    }
    MyLogger.prototype.setClassName = function (className) {
    };
    MyLogger.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        throw new Error('Method not implemented.');
    };
    MyLogger.prototype.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        throw new Error('Method not implemented.');
    };
    MyLogger.prototype.info = function (a) {
        this.a = a;
    };
    MyLogger.prototype.debug = function (a) {
        this.a = a[0];
        this.b = a[1];
    };
    return MyLogger;
}());
var MyClass = (function () {
    function MyClass() {
        this.that = this;
    }
    MyClass.prototype.getLogger = function () {
        return this.logger;
    };
    MyClass.prototype.sumUp = function (a, b) {
        return a + b;
    };
    return MyClass;
}());
__decorate([
    get_logger_1.GetLogger(MyLogger)
], MyClass.prototype, "logger", void 0);
__decorate([
    method_anno_1.ObserveMethod({
        methodCalled: function (that, a) {
            that.logger.debug(a);
        }
    })
], MyClass.prototype, "sumUp", null);
var MyClassForReturn = (function () {
    function MyClassForReturn() {
    }
    MyClassForReturn.prototype.getLogger = function () {
        return this.logger;
    };
    MyClassForReturn.prototype.sumUp = function (a, b) {
        return a + b;
    };
    return MyClassForReturn;
}());
__decorate([
    get_logger_1.GetLogger(MyLogger)
], MyClassForReturn.prototype, "logger", void 0);
__decorate([
    method_anno_1.ObserveMethod({
        methodReturns: function (that, result) {
            that.logger.info(result);
        }
    })
], MyClassForReturn.prototype, "sumUp", null);
var MyClassForRV = (function () {
    function MyClassForRV() {
    }
    MyClassForRV.prototype.sumUp = function (a, b) {
        return a + b;
    };
    MyClassForRV.prototype.doVoidStuff = function () {
    };
    return MyClassForRV;
}());
__decorate([
    rv_method_1.RVMethod()
], MyClassForRV.prototype, "sumUp", null);
__decorate([
    rv_method_1.RVMethod()
], MyClassForRV.prototype, "doVoidStuff", null);
var IT1Suite = (function () {
    function IT1Suite() {
    }
    IT1Suite.prototype["Method called"] = function () {
        var myClass = new MyClass();
        var result = myClass.sumUp(3, 7);
        chai_1.assert.equal(3, myClass.getLogger().a);
        chai_1.assert.equal(7, myClass.getLogger().b);
        chai_1.assert.equal(10, result);
        chai_1.assert.isTrue(myClass.getLogger() instanceof MyLogger);
    };
    IT1Suite.prototype["Method returns"] = function () {
        var myClass = new MyClassForReturn();
        var result = myClass.sumUp(3, 7);
        chai_1.assert.equal(10, myClass.getLogger().a);
        chai_1.assert.equal(10, result);
        chai_1.assert.isTrue(myClass.getLogger() instanceof MyLogger);
    };
    IT1Suite.prototype["Method called RVMethod"] = function () {
        var myClass = new MyClassForRV();
        var result = myClass.sumUp(3, 7);
        chai_1.assert.equal(10, result);
    };
    IT1Suite.prototype["Method called using batch"] = function () {
        var myClass = new MyClassForRV();
        var result = myClass.sumUp(1, 2);
        myClass.sumUp(3, 4);
        myClass.sumUp(5, 6);
        chai_1.assert.equal(3, result);
    };
    IT1Suite.prototype["Method called RVMethod void"] = function () {
        var myClass = new MyClassForRV();
        myClass.doVoidStuff();
    };
    return IT1Suite;
}());
__decorate([
    mocha_typescript_1.test
], IT1Suite.prototype, "Method called", null);
__decorate([
    mocha_typescript_1.test
], IT1Suite.prototype, "Method returns", null);
__decorate([
    mocha_typescript_1.test
], IT1Suite.prototype, "Method called RVMethod", null);
__decorate([
    mocha_typescript_1.test
], IT1Suite.prototype, "Method called using batch", null);
__decorate([
    mocha_typescript_1.test
], IT1Suite.prototype, "Method called RVMethod void", null);
IT1Suite = __decorate([
    mocha_typescript_1.suite
], IT1Suite);
