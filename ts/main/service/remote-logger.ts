import { ILogger } from './i-logger';
import { LogLevelChecker } from "./log-level-checker"
import { LoggerWithChecker } from './logger-with-checker';

export class RemoteLogger extends LoggerWithChecker {
    protected logFatal(message?: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    protected logError(message?: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    protected logWarn(message?: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    protected logInfo(message?: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    protected logDebug(message?: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    protected logTrace(message?: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }

}
