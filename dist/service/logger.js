"use strict";
exports.__esModule = true;
var CONSOLE_DEBUG_METHOD = console["debug"] ? "debug" : "log";
var Logger = (function () {
    function Logger() {
    }
    Logger.prototype.setClassName = function (cN) {
        this.className = cN;
    };
    Logger.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        arguments[0] = "ERROR " + this.className + ": " + arguments[0];
        console.error.apply(console, arguments);
    };
    Logger.prototype.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        arguments[0] = "WARN  " + this.className + ": " + arguments[0];
        console.warn.apply(console, arguments);
    };
    Logger.prototype.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        arguments[0] = "INFO  " + this.className + ": " + arguments[0];
        console.info.apply(console, arguments);
    };
    Logger.prototype.debug = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        arguments[0] = "DEBUG " + this.className + ": " + arguments[0];
        console[CONSOLE_DEBUG_METHOD].apply(console, arguments);
    };
    return Logger;
}());
exports.Logger = Logger;
