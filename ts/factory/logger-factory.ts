
import { ILogger } from '../service/i-logger';
import { Logger } from '../service/logger';
import {LoggerFactoryException} from "./logger-factory-exception";

const CONSOLE_DEBUG_METHOD = console["debug"] ? "debug" : "log";


export class LoggerFactory {

    private static logger : ILogger = null;


    constructor() {

    }

    public static setLogger(logger: ILogger){
        if(this.logger !== null){
            throw new LoggerFactoryException("logger can not be set more then once.");
        }
        this.logger = logger;
    }

    public static get(cN: string): ILogger {
        let myLogger = new Logger();
        myLogger.setClassName(cN);
        return myLogger;
    }

}
