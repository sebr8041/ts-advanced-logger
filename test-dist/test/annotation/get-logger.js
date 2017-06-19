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
var logger_factory_1 = require("../../main/factory/logger-factory");
var get_logger_1 = require("../../main/annotation/get-logger");
var MyLogger = (function () {
    function MyLogger() {
    }
    MyLogger.prototype.setClassName = function (className) {
        //throw new Error('Method not implemented.');
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
    MyLogger.prototype.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        throw new Error('Method not implemented.');
    };
    MyLogger.prototype.debug = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        throw new Error('Method not implemented.');
    };
    return MyLogger;
}());
var MyDefaultLogger = (function () {
    function MyDefaultLogger() {
    }
    MyDefaultLogger.prototype.setClassName = function (className) {
        //throw new Error('Method not implemented.');
    };
    MyDefaultLogger.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        throw new Error('Method not implemented.');
    };
    MyDefaultLogger.prototype.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        throw new Error('Method not implemented.');
    };
    MyDefaultLogger.prototype.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        throw new Error('Method not implemented.');
    };
    MyDefaultLogger.prototype.debug = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        throw new Error('Method not implemented.');
    };
    return MyDefaultLogger;
}());
var GetLoggerSuite = (function () {
    function GetLoggerSuite() {
    }
    GetLoggerSuite.prototype["Get Instance of ILogger"] = function () {
        var MyClass = (function () {
            function MyClass() {
            }
            MyClass.prototype.getLogger = function () {
                return this.logger;
            };
            return MyClass;
        }());
        __decorate([
            get_logger_1.GetLogger(MyLogger)
        ], MyClass.prototype, "logger", void 0);
        chai_1.assert.isTrue(new MyClass().getLogger() instanceof MyLogger);
    };
    GetLoggerSuite.prototype["Using Default-Logger"] = function () {
        logger_factory_1.LoggerFactory.setDefaultLogger(MyDefaultLogger);
        var MyClass = (function () {
            function MyClass() {
            }
            MyClass.prototype.getLogger = function () {
                return this.logger;
            };
            return MyClass;
        }());
        __decorate([
            get_logger_1.GetLogger()
        ], MyClass.prototype, "logger", void 0);
        chai_1.assert.isTrue(new MyClass().getLogger() instanceof MyDefaultLogger);
    };
    return GetLoggerSuite;
}());
__decorate([
    mocha_typescript_1.test
], GetLoggerSuite.prototype, "Get Instance of ILogger", null);
__decorate([
    mocha_typescript_1.test
], GetLoggerSuite.prototype, "Using Default-Logger", null);
GetLoggerSuite = __decorate([
    mocha_typescript_1.suite
], GetLoggerSuite);
