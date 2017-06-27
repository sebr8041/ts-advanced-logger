
import { ILogger } from './i-logger';
import { LogLevelChecker } from './log-level-checker';
import {LogLevelEnum} from "../enum/log-level-enum";
/**
 * does the current browser support console.debug ?
 * when not do console.log
 */
const CONSOLE_DEBUG_METHOD = console["debug"] ? "debug" : "log";

/**
 * normal logger implementation to to on the browser console.
 */
export class Logger implements ILogger {

    private className: string;
    private checker: LogLevelChecker;

    constructor() {
    }

    public setClassName(cN: string) {
        this.className = cN;
    }

    public getClassName(): string {
        return this.className;
    }
    
    public setLogLevelChecker(lLC: LogLevelChecker) {
        this.checker = lLC;
    }

    public error(message?: any, ...optionalParams: any[]) {
        if (this.checker.isLogEnabled(this.getClassName(), LogLevelEnum.ERROR)) {
            arguments[0] = "ERROR " + this.className + ": " + arguments[0];
            console.error.apply(console, arguments);
        }
    }

    public warn(message?: any, ...optionalParams: any[]) {
        if (this.checker.isLogEnabled(this.getClassName(), LogLevelEnum.WARN)) {
            arguments[0] = "WARN  " + this.className + ": " + arguments[0];
            console.warn.apply(console, arguments);
        }
    }

    public info(message?: any, ...optionalParams: any[]) {
        if (this.checker.isLogEnabled(this.getClassName(), LogLevelEnum.ERROR)) {
            arguments[0] = "INFO  " + this.className + ": " + arguments[0];
            console.info.apply(console, arguments);
        }
    }

    public debug(message?: any, ...optionalParams: any[]) {
        if (this.checker.isLogEnabled(this.getClassName(), LogLevelEnum.ERROR)) {
            arguments[0] = "DEBUG " + this.className + ": " + arguments[0];
            (<any>console)[CONSOLE_DEBUG_METHOD].apply(console, arguments);
        }
    }


}
