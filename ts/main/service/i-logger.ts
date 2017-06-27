import { LogLevelChecker } from "./log-level-checker"
/**
 * logger inferface.
 */
export interface ILogger {

    /**
    * is called by reporting an trace message
    */
    trace(message?: any, ...optionalParams: any[])

    /**
    * is called by reporting an debug message
    */
    debug(message?: any, ...optionalParams: any[])

    /**
    * is called by reporting an info message
    */
    info(message?: any, ...optionalParams: any[])

    /**
    * is called by reporting an warning message
    */
    warn(message?: any, ...optionalParams: any[])

    /**
     * is called by reporting an error message
     */
    error(message?: any, ...optionalParams: any[])

    /**
     * is called by reporting an error message
     */
    fatal(message?: any, ...optionalParams: any[])


    /**
     * over this method the current class name get setted by the GetLogger decorator
     */
    setClassName(className: string): void

    /**
     * over this method the instance to check where the logger should log information will be setted.
     */
    setLogLevelChecker(lLC: LogLevelChecker): void
}