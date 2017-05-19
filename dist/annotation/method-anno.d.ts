/**
 * anno to load logger from LoggerFactory into instance-field.
 */
export declare function MethodAnno(): (target: any, methodName: string) => void;
export declare function MethodAnno2(nehme: any): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function g(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
