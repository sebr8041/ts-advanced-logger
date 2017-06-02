"use strict";
exports.__esModule = true;
var logger_factory_1 = require("../factory/logger-factory");
/**
 * anno to load logger from LoggerFactory into instance-field.
 */
function GetLogger() {
    return function (target, variableName) {
        // save to target field the instance of the logger.
        target[variableName] = logger_factory_1.LoggerFactory.get(target.constructor.name);
    };
}
exports.GetLogger = GetLogger;
