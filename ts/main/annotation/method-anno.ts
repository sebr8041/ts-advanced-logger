import { ILogger } from '../service/i-logger';
import { LoggerFactory } from "../factory/logger-factory";
/**
 * anno to load logger from LoggerFactory into instance-field.
 */
export function MethodAnno() {
    return function (target: any, methodName: string) {
        console.log("dat", target, methodName);
        var oldMethod = target[methodName];
        // ...parms: any[]
        target[methodName] = function(){
            console.log("hier");
            //oldMethod(parms);
            console.log("da");
        };

        console.log(oldMethod, target[methodName]);
    }
}

export function MethodAnno2(nehme:any) {
    console.log("wat", arguments);
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("dsjsd", descriptor);

        let originalMethod = descriptor.value; // save a reference to the original method
        console.log("descriptor",  descriptor.value.arguments);
       
        // NOTE: Do not use arrow syntax here. Use a function expression in 
        // order to use the correct value of `this` in this method (see notes below)
        descriptor.value = function (...args: any[]) {
            console.log("The method args are: " + JSON.stringify(args)); // pre
            let result = originalMethod.apply(this, args);               // run and store the result
            console.log("The return value is: " + result);               // post
            return result;                                               // return the result of the original method
        };

        return descriptor;

    };
};

export function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

