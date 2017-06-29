
import { ILogger } from './i-logger';
import { LogLevelChecker } from './log-level-checker';
import { LogLevelEnum } from "../enum/log-level-enum";
import { LoggerWithChecker } from './logger-with-checker';
import { ClientService } from "./client-service"
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
        console.error("FATAL " + this.getClassName() + ": ", message, ...optionalParams)
    }
    protected logError(message?: any, ...optionalParams: any[]) {
        console.error("ERROR " + this.getClassName() + ": ", message, ...optionalParams)
    }
    protected logWarn(message?: any, ...optionalParams: any[]) {
        console.warn("WARN " + this.getClassName() + ": ", message, ...optionalParams)
    }
    protected logInfo(message?: any, ...optionalParams: any[]) {
        console.warn("INFO " + this.getClassName() + ": ", message, ...optionalParams)
    }
    protected logDebug(message?: any, ...optionalParams: any[]) {
        if (console.debug) {
            console.debug("DEBUG " + this.getClassName() + ": ", message, ...optionalParams)
        } else {
            console.log("DEBUG " + this.getClassName() + ": ", message, ...optionalParams)
        }
    }
    protected logTrace(message?: any, ...optionalParams: any[]) {
        if (console.debug) {
            console.debug("TRACE " + this.getClassName() + ": ", message, ...optionalParams)
        } else {
            console.log("TRACE " + this.getClassName() + ": ", message, ...optionalParams)
        }
    }

    private convertToString(message: any) {
        if (typeof message === 'object') {
            return JSON.stringify(message)
        }
        return message;
    }

}
