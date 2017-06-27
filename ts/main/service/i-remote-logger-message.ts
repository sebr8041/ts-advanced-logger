import { LogLevelEnum } from "../enum/log-level-enum";

/**
 * representation of an message for remote logger
 */
export interface IRemoteLoggerMessage {
    /**
     * classname in string format
     */
    className: string;

    /**
     * log level for the specific class
     */
    logLevel: LogLevelEnum;

    /**
     * log message
     */
    message: any;
}