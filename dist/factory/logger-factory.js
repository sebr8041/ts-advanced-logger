"use strict";
exports.__esModule = true;
var logger_1 = require("../service/logger");
var logger_factory_exception_1 = require("./logger-factory-exception");
var CONSOLE_DEBUG_METHOD = console["debug"] ? "debug" : "log";
var LoggerFactory = (function () {
    function LoggerFactory() {
    }
    LoggerFactory.setLogger = function (logger) {
        if (this.logger !== null) {
            throw new logger_factory_exception_1.LoggerFactoryException("logger can not be set more then once.");
        }
        this.logger = logger;
    };
    LoggerFactory.get = function (cN) {
        var myLogger = new logger_1.Logger();
        myLogger.setClassName(cN);
        return myLogger;
    };
    return LoggerFactory;
}());
LoggerFactory.logger = null;
exports.LoggerFactory = LoggerFactory;
