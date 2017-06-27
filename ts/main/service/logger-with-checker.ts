
import { ILogger } from './i-logger';
import { LogLevelChecker } from './log-level-checker';
import { LogLevelEnum } from "../enum/log-level-enum";

/**
 * this abstract logger checks log level for the diffrent classes and call only log* methods when log should be done.
 */
export abstract class LoggerWithChecker implements ILogger {

    /**
     * logger saves class name in which context logger should log.
     */
    private className: string = null;

    /**
     * logger saves checker to check which log should be done by this logger.
     */
    private checker: LogLevelChecker = null;

    constructor() {
    }

    /**
     * set the current class name. called by GetLogger decorator
     * @param cN 
     */
    public setClassName(cN: string) {
        this.className = cN;
    }

    /**
     * returns the className
     */
    public getClassName(): string {
        return this.className;
    }

    /**
     * sets the current log level checker. called by GetLogger decorator.
     * @param lLC 
     */
    public setLogLevelChecker(lLC: LogLevelChecker) {
        this.checker = lLC;
    }

    /**
     * get called when log should be done on this level for the current class.
     * @param message 
     * @param optionalParams 
     */
    protected abstract logFatal(message?: any, ...optionalParams: any[]);

    /**
     * get called when log should be done on this level for the current class.
     * @param message 
     * @param optionalParams 
     */
    protected abstract logError(message?: any, ...optionalParams: any[]);

    /**
     * get called when log should be done on this level for the current class.
     * @param message 
     * @param optionalParams 
     */
    protected abstract logWarn(message?: any, ...optionalParams: any[]);

    /**
     * get called when log should be done on this level for the current class.
     * @param message 
     * @param optionalParams 
     */
    protected abstract logInfo(message?: any, ...optionalParams: any[]);

    /**
     * get called when log should be done on this level for the current class.
     * @param message 
     * @param optionalParams 
     */
    protected abstract logDebug(message?: any, ...optionalParams: any[]);

    /**
     * get called when log should be done on this level for the current class.
     * @param message 
     * @param optionalParams 
     */
    protected abstract logTrace(message?: any, ...optionalParams: any[]);

    /**
     * log on fatal
     * @param message 
     * @param optionalParams 
     */
    public fatal(message?: any, ...optionalParams: any[]) {
        if (this.checkValidInstanceFields() && this.checker.isLogEnabled(this.getClassName(), LogLevelEnum.ERROR)) {
            this.logFatal(arguments)
        }
    }

    /**
     * log on error
     * @param message 
     * @param optionalParams 
     */
    public error(message?: any, ...optionalParams: any[]) {
        if (this.checkValidInstanceFields() && this.checker.isLogEnabled(this.getClassName(), LogLevelEnum.ERROR)) {
            this.logError(arguments);
        }
    }

    /**
     * log on warn
     * @param message 
     * @param optionalParams 
     */
    public warn(message?: any, ...optionalParams: any[]) {
        if (this.checkValidInstanceFields() && this.checker.isLogEnabled(this.getClassName(), LogLevelEnum.WARN)) {
            this.logWarn(arguments);
        }
    }

    /**
     * log on info
     * @param message 
     * @param optionalParams 
     */
    public info(message?: any, ...optionalParams: any[]) {
        if (this.checkValidInstanceFields() && this.checker.isLogEnabled(this.getClassName(), LogLevelEnum.ERROR)) {
            this.logInfo(arguments);
        }
    }

    /**
     * log on debug
     * @param message 
     * @param optionalParams 
     */
    public debug(message?: any, ...optionalParams: any[]) {
        if (this.checkValidInstanceFields() && this.checker.isLogEnabled(this.getClassName(), LogLevelEnum.ERROR)) {
            this.logDebug(arguments)
        }
    }

    /**
     * log on trace
     * @param message 
     * @param optionalParams 
     */
    public trace(message?: any, ...optionalParams: any[]) {
        if (this.checkValidInstanceFields() && this.checker.isLogEnabled(this.getClassName(), LogLevelEnum.ERROR)) {
            this.logTrace(arguments)
        }
    }

    /**
     * checks the instance fields are valid.
     */
    private checkValidInstanceFields(): boolean {
        if (this.checker === null || this.checker === undefined) {
            console.error("In LoggerWithChecker the LogLevelChecker is not set. You can set this over LoggerWithChecker.setLogLevelChecker");
            return false;
        }

        if (this.className === null || this.className === undefined) {
            console.error("In LoggerWithChecker the className is not set. You can set this over LoggerWithChecker.setClassName");
            return false;
        }

        return true;
    }


}
