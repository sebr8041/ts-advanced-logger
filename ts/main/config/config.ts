import {ILogger} from "../service/i-logger"
import {ConsoleLogger} from "../service/console-logger"
import {IEndpoint} from "../rv/endpoint/i-endpoint"
import {BufferedAjaxEndpoint} from "../rv/endpoint/buffered-ajax-endpoint"
import {JsonRvLogConverter} from "../rv/converter/json-rv-log-converter"
import {ILogLevelRule} from "../service/i-log-level-rule"

export interface ILoggerConfig {
    defaultLoggerClass: ILogger
    bufferSize: number
    serverEnpoint: string
    rvEndpoint: IEndpoint
    rules: ILogLevelRule[]


}

export class DefaultLoggerConfig implements ILoggerConfig {
    rvEndpoint: IEndpoint = new BufferedAjaxEndpoint();

    defaultLoggerClass: ILogger = new ConsoleLogger();
    bufferSize: number = 5;
    serverEnpoint: string = "http://localhost:8080/logger";
    rules: ILogLevelRule[] = []

    constructor(){
        this.rvEndpoint.setConverter(new JsonRvLogConverter())
        this.rvEndpoint.setUrl(this.serverEnpoint)
    }
}

export class LoggerConfig {
    
    private static loggerConfig : ILoggerConfig;

    private static setConfig(loggerConfig: ILoggerConfig): void {
        LoggerConfig.loggerConfig = loggerConfig
    }

    public static getLoggerConfig(): ILoggerConfig {
        if(!LoggerConfig.loggerConfig) {
            LoggerConfig.setConfig(new DefaultLoggerConfig())
        }
        return LoggerConfig.loggerConfig
    }
}