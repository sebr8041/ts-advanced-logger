import { LogLevelChecker } from "./log-level-checker"
/**
 * logger inferface.
 */
export interface ILogger {

    /**
     * is called by reporting an error message
     */
    error(message?: any, ...optionalParams: any[])

    /**
    * is called by reporting an warning message
    */
    warn(message?: any, ...optionalParams: any[])

    /**
    * is called by reporting an info message
    */
    info(message?: any, ...optionalParams: any[])

    /**
    * is called by reporting an debug message
    */
    debug(message?: any, ...optionalParams: any[])

    /**
     * over this method the current class name get setted by the GetLogger decorator
     */
    setClassName(className: string): void

    setLogLevelChecker(lLC: LogLevelChecker): void
}