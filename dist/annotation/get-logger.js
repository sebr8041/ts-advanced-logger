"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_factory_1 = require("../factory/logger-factory");
/**
 * Decorator to inject a logger-instance into an instance-variable.
 * @param loggerClass The Class of the Logger, that shall be used. Leave empty to use the default-logger.
 */
function GetLogger(loggerClass) {
    return function (target, variableName) {
        // save to target field the instance of the logger.
        if (loggerClass) {
            console.log("GetLogger with loggerClass: ", loggerClass);
            var logger = new loggerClass();
            logger.setClassName(target.constructor.name);
            target[variableName] = logger;
        }
        else {
            console.log("GetLogger without loggerClass. Using default!");
            target[variableName] = logger_factory_1.LoggerFactory.getDefaultLogger(target.constructor.name);
        }
    };
}
exports.GetLogger = GetLogger;
