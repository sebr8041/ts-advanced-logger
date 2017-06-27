
import { ILogger } from '../service/i-logger';
import { LoggerFactoryException } from "./logger-factory-exception";
import { LogLevelChecker } from "../service/log-level-checker"



/**
 * Factory to access default-logger.
 */
export class LoggerFactory {

    private static defaultLoggerConstructorFn = null;

    constructor() {

    }

    /**
     * Sets the default-logger that will be used, if no other logger is defined.
     * @param constructorFn The Default-Logger Class.
     */
    public static setDefaultLogger<T extends ILogger>(constructorFn: new () => T) {
        this.defaultLoggerConstructorFn = constructorFn
    }

    /**
     * Returns a new instance of the default-logger.
     * @param className The name of the class using this logger. 
     */
    public static getDefaultLogger(className: string): ILogger {
        if (this.defaultLoggerConstructorFn == null) {
            throw new LoggerFactoryException("No default-logger defined! Use LoggerFactory.setDefaultLogger(MyLogger) to set a defaultLogger, where MyLogger is your own ILogger-implementation!")
        }
        let logger = new this.defaultLoggerConstructorFn()
        logger.setClassName(className);
        logger.setLogLevelChecker(LogLevelChecker.get())
        return logger;
    }

}
