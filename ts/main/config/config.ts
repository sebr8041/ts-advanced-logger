import { ILogger } from "../service/i-logger"
import { ConsoleLogger } from "../service/console-logger"
import { IEndpoint } from "../rv/endpoint/i-endpoint"
import { BufferedAjaxEndpoint } from "../rv/endpoint/buffered-ajax-endpoint"
import { JsonRvLogConverter } from "../rv/converter/json-rv-log-converter"
import { ILogLevelRule } from "../service/i-log-level-rule"

/**
 * Interface that provides access to all required configurations
 */
export interface ILoggerConfig {
    defaultLoggerClass: ILogger
    bufferSize: number
    serverEnpoint: string
    rvEndpoint: IEndpoint
    rules: ILogLevelRule[]
}

/**
 * DefaultConfiguration that will be used, if no other configuration is defined.
 */
export class DefaultLoggerConfig implements ILoggerConfig {

    defaultLoggerClass: ILogger = new ConsoleLogger();
    bufferSize: number = 5;
    serverEnpoint: string = "http://localhost:8080/logger";
    rules: ILogLevelRule[] = []
    rvEndpoint: IEndpoint = new BufferedAjaxEndpoint(this.bufferSize);

    constructor() {
        this.rvEndpoint.setConverter(new JsonRvLogConverter())
        this.rvEndpoint.setUrl(this.serverEnpoint)
    }
}

export class LoggerConfig {

    private static loggerConfig: ILoggerConfig;
    /**
     * 
     * @param loggerConfig The configuration that shall be used by the logger
     */
    public static setConfig(loggerConfig: ILoggerConfig): void {
        LoggerConfig.loggerConfig = loggerConfig
    }

    /**
     * @returns The configuration used by the logger
     */
    public static getLoggerConfig(): ILoggerConfig {
        if (!LoggerConfig.loggerConfig) {
            LoggerConfig.setConfig(new DefaultLoggerConfig())
        }
        return LoggerConfig.loggerConfig
    }
}