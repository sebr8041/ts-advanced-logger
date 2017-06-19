import { ILogger } from '../service/i-logger';
import { LoggerFactory } from "../factory/logger-factory";

/**
 * Implement this Interface to use the @ObserveMethod-Decorator.
 */
export interface IMethodObserver {
    /**
     * @param that References to class, the decorator is used in
     * @param args All arguments the decorated method is called with
     */
    methodCalled?: ((that, ...args: any[]) => void),
    methodReturns?: ((that, ...args: any[]) => void),
    methodNameCalled?: (methodName: string) => void
}

export function ObserveMethod(methodObserver: IMethodObserver) {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor): void {
        let originalMethod = descriptor.value
        
        descriptor.value = function (...args: any[]) {
            if(methodObserver.methodNameCalled) {
                methodObserver.methodNameCalled(target.constructor.name+"."+propertyKey)
            }
            if (methodObserver.methodCalled) {
                methodObserver.methodCalled(target, args)
            }
            let result = originalMethod.apply(this, args)
            if (methodObserver.methodReturns) {
                methodObserver.methodReturns(target, result);
            }
            return result
        }
    }
}


