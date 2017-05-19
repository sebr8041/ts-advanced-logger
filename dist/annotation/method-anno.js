"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * anno to load logger from LoggerFactory into instance-field.
 */
function MethodAnno() {
    return function (target, methodName) {
        console.log("dat", target, methodName);
        var oldMethod = target[methodName];
        // ...parms: any[]
        target[methodName] = function () {
            console.log("hier");
            //oldMethod(parms);
            console.log("da");
        };
        console.log(oldMethod, target[methodName]);
    };
}
exports.MethodAnno = MethodAnno;
function MethodAnno2(nehme) {
    console.log("wat", arguments);
    return function (target, propertyKey, descriptor) {
        console.log("dsjsd", descriptor);
        var originalMethod = descriptor.value; // save a reference to the original method
        console.log("descriptor", descriptor.value.arguments);
        // NOTE: Do not use arrow syntax here. Use a function expression in 
        // order to use the correct value of `this` in this method (see notes below)
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log("The method args are: " + JSON.stringify(args)); // pre
            var result = originalMethod.apply(this, args); // run and store the result
            console.log("The return value is: " + result); // post
            return result; // return the result of the original method
        };
        return descriptor;
    };
}
exports.MethodAnno2 = MethodAnno2;
;
function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("g(): called");
    };
}
exports.g = g;
//# sourceMappingURL=method-anno.js.map