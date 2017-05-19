"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RemoteLogger = (function () {
    function RemoteLogger() {
    }
    RemoteLogger.prototype.setClassName = function (cN) {
        this.className = cN;
    };
    RemoteLogger.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
    };
    RemoteLogger.prototype.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
    };
    RemoteLogger.prototype.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
    };
    RemoteLogger.prototype.debug = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
    };
    return RemoteLogger;
}());
exports.RemoteLogger = RemoteLogger;
//# sourceMappingURL=remote-logger.js.map