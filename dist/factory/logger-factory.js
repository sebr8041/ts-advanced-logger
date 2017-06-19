"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_factory_exception_1 = require("./logger-factory-exception");
var CONSOLE_DEBUG_METHOD = console["debug"] ? "debug" : "log";
/**
 * Factory to access default-logger.
 */
var LoggerFactory = (function () {
    function LoggerFactory() {
    }
    /**
     * Sets the default-logger that will be used, if no other logger is defined.
     * @param constructorFn The Default-Logger Class.
     */
    LoggerFactory.setDefaultLogger = function (constructorFn) {
        this.defaultLoggerConstructorFn = constructorFn;
    };
    /**
     * Returns a new instance of the default-logger.
     * @param className The name of the class using this logger.
     */
    LoggerFactory.getDefaultLogger = function (className) {
        if (this.defaultLoggerConstructorFn == null) {
            throw new logger_factory_exception_1.LoggerFactoryException("No default-logger defined! Use LoggerFactory.setDefaultLogger(MyLogger) to set a defaultLogger, where MyLogger is your own ILogger-implementation!");
        }
        var logger = new this.defaultLoggerConstructorFn();
        logger.setClassName(className);
        return logger;
    };
    return LoggerFactory;
}());
LoggerFactory.defaultLoggerConstructorFn = null;
exports.LoggerFactory = LoggerFactory;
