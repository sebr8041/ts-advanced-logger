import { ILogger } from './i-logger';
export declare class Logger implements ILogger {
    private className;
    constructor();
    setClassName(cN: string): void;
    error(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    debug(message?: any, ...optionalParams: any[]): void;
}
