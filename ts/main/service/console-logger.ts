
import { ILogger } from './i-logger';
import { LogLevelChecker } from './log-level-checker';
import { LogLevelEnum } from "../enum/log-level-enum";
import { LoggerWithChecker } from './logger-with-checker';
import {ClientService} from "./client-service"
/**
 * does the current browser support console.debug ?
 * when not do console.log
 */
const CONSOLE_DEBUG_METHOD = console["debug"] ? "debug" : "log";

/**
 * normal logger implementation to to on the browser console.
 */
export class ConsoleLogger extends LoggerWithChecker {

    setClientService(clientService: ClientService): void {
    }

    protected logFatal(message?: any, ...optionalParams: any[]) {
        arguments[0] = "FATAL " + this.getClassName() + ": " + arguments[0];
        console.error.apply(console, arguments);
    }
    protected logError(message?: any, ...optionalParams: any[]) {
        arguments[0] = "ERROR " + this.getClassName() + ": " + JSON.stringify(arguments[0]);
        console.error.apply(console, arguments);
    }
    protected logWarn(message?: any, ...optionalParams: any[]) {
        //arguments[0] = "WARN  " + this.getClassName() + ": " + arguments[0];
         
        //message[0] = "WARN  " + this.getClassName() + ": "+Array.prototype.slice.call(msg)
        console.log("message: ", message)
        //console.warn("WARN  " + this.getClassName() + ": ", message, optionalParams)
        console.warn.apply(console, arguments);
    }
    protected logInfo(message?: any, ...optionalParams: any[]) {
        arguments[0] = "INFO  " + this.getClassName() + ": " + arguments[0];
        console.info.apply(console, arguments);
    }
    protected logDebug(message?: any, ...optionalParams: any[]) {
        arguments[0] = "DEBUG " + this.getClassName() + ": " + arguments[0];
        (<any>console)[CONSOLE_DEBUG_METHOD].apply(console, arguments);
    }
    protected logTrace(message?: any, ...optionalParams: any[]) {
        arguments[0] = "TRACE " + this.getClassName() + ": " + arguments[0];
        (<any>console)[CONSOLE_DEBUG_METHOD].apply(console, arguments);
    }

}
