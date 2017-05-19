"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_level_checker_1 = require("../service/log-level-checker");
var log_level_checker_factory_exception_1 = require("./log-level-checker-factory-exception");
var LogLevelCheckerFactory = (function () {
    function LogLevelCheckerFactory() {
    }
    LogLevelCheckerFactory.setChecker = function (checker) {
        if (this.checker !== null) {
            throw new log_level_checker_factory_exception_1.LogLevelCheckerFactoryException("logChecker can not be set more then once.");
        }
        this.checker = checker;
    };
    LogLevelCheckerFactory.get = function () {
        var myLogLevelChecker = new log_level_checker_1.LogLevelChecker();
        return myLogLevelChecker;
    };
    return LogLevelCheckerFactory;
}());
LogLevelCheckerFactory.checker = null;
exports.LogLevelCheckerFactory = LogLevelCheckerFactory;
//# sourceMappingURL=log-level-checker-factory.js.map