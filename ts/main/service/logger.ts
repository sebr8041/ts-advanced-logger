
import { ILogger } from './i-logger';

const CONSOLE_DEBUG_METHOD = console["debug"] ? "debug" : "log";

export class Logger implements ILogger {

    private className: string;

    constructor() {

    }

    public setClassName(cN: string) {
        this.className = cN;
    }

    public error(message?: any, ...optionalParams: any[]) {
        arguments[0] = "ERROR " + this.className + ": " + arguments[0];
        console.error.apply(console, arguments);
    }

    public warn(message?: any, ...optionalParams: any[]) {
        arguments[0] = "WARN  " + this.className + ": " + arguments[0];
        console.warn.apply(console, arguments);
    }
 
    public info(message?: any, ...optionalParams: any[]) {
        arguments[0] = "INFO  " + this.className + ": " + arguments[0];
        console.info.apply(console, arguments);
    }

    public debug(message?: any, ...optionalParams: any[]) {
        arguments[0] = "DEBUG " + this.className + ": " + arguments[0];
        (<any>console)[CONSOLE_DEBUG_METHOD].apply(console, arguments);
    }


}
