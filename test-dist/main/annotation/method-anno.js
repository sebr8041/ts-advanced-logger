"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ObserveMethod(methodObserver) {
    return function (target, propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (methodObserver.methodNameCalled) {
                methodObserver.methodNameCalled(target.constructor.name + "." + propertyKey);
            }
            if (methodObserver.methodCalled) {
                methodObserver.methodCalled(target, args);
            }
            var result = originalMethod.apply(this, args);
            if (methodObserver.methodReturns) {
                methodObserver.methodReturns(target, result);
            }
            return result;
        };
    };
}
exports.ObserveMethod = ObserveMethod;
