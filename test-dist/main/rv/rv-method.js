"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var method_anno_1 = require("../annotation/method-anno");
var get_logger_1 = require("../annotation/get-logger");
var config_1 = require("../config/config");
var RVLogger = (function () {
    function RVLogger() {
    }
    RVLogger.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        throw new Error('Method not implemented.');
    };
    RVLogger.prototype.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        throw new Error('Method not implemented.');
    };
    RVLogger.prototype.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        throw new Error('Method not implemented.');
    };
    RVLogger.prototype.debug = function (toLog) {
        console.log("will send to log: ", toLog);
    };
    RVLogger.prototype.setClassName = function (className) {
    };
    return RVLogger;
}());
exports.RVLogger = RVLogger;
var RVMethodObserver = (function () {
    function RVMethodObserver() {
        this.arguments = "";
        this.result = "";
        this.startTime = 0;
        this.executionTimeMillis = 0;
        this.methodName = "";
    }
    RVMethodObserver.prototype.methodNameCalled = function (methodName) {
        this.methodName = methodName;
    };
    RVMethodObserver.prototype.methodCalled = function (that) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.arguments = args[0].join(", ");
        this.startTime = new Date().getTime();
    };
    RVMethodObserver.prototype.methodReturns = function (that) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.executionTimeMillis = new Date().getTime() - this.startTime;
        this.result = args.join(", ");
        this.log();
    };
    RVMethodObserver.prototype.log = function () {
        RVMethodObserver.logNumber++;
        if (RVMethodObserver.clientId === null) {
            RVMethodObserver.clientId = this.generateClientId();
        }
        var date = new Date().toDateString();
        var result = {
            timestamp: date,
            clientId: RVMethodObserver.clientId,
            logNumber: RVMethodObserver.logNumber,
            methodName: this.methodName,
            arguments: this.arguments,
            result: this.result,
            executionTimeMS: this.executionTimeMillis
        };
        this.logger.debug(JSON.stringify(result));
        //RVMethodObserver.buffer.push(JSON.stringify(result))
        RVMethodObserver.buffer.push(result);
        if (RVMethodObserver.buffer.length >= config_1.RVConfig.BATCH_SIZE) {
            console.log("send A", JSON.stringify(RVMethodObserver.buffer));
            console.log("send B", RVMethodObserver.buffer);
            this.postToServer(JSON.stringify(RVMethodObserver.buffer));
            RVMethodObserver.buffer = [];
        }
    };
    RVMethodObserver.prototype.postToServer = function (message) {
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var r = new XMLHttpRequest();
        r.open("POST", config_1.RVConfig.SERVER_ENDPOINT, true);
        r.setRequestHeader("Content-type", "application/json");
        r.send(message);
    };
    // TODO find a better strategy to compute a unique client ID
    RVMethodObserver.prototype.generateClientId = function () {
        var rand1 = Math.floor(Math.random() * 1000) + 1;
        var rand2 = Math.floor(Math.random() * 1000) + 1;
        return "" + new Date().getTime() + "_" + rand1 + "_" + rand2;
    };
    return RVMethodObserver;
}());
RVMethodObserver.clientId = null;
RVMethodObserver.logNumber = 0;
RVMethodObserver.buffer = [];
__decorate([
    get_logger_1.GetLogger(RVLogger)
], RVMethodObserver.prototype, "logger", void 0);
/*
 @RVMethod({
 withArgs:boolean,
 withResult: boolean,
 setLogger: ILogger,
 clientID: string,
 logNumber: number,
 execTime: number
 })
 */
function RVMethod() {
    return method_anno_1.ObserveMethod(new RVMethodObserver());
}
exports.RVMethod = RVMethod;
