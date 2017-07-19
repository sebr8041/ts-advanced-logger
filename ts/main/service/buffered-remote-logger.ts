import { ILogger } from './i-logger';
import { LogLevelChecker } from "./log-level-checker"
import { LoggerWithChecker } from './logger-with-checker';
import { IRemoteLoggerMessage } from "./i-remote-logger-message"
import { LogLevelEnum } from "../enum/log-level-enum"
import { ClientService } from "./client-service"
import { BufferService } from "./buffer-service"

export class BufferedRemoteLogger extends LoggerWithChecker {

    private static serverUrl: string = null;

    private clientService: ClientService = null;

    private buffer: BufferService = null;

    private static maxSize: number = 10;

    
    constructor(size?: number) {
        super()
        if (size === undefined || size === null) {
            this.buffer = new BufferService(BufferedRemoteLogger.maxSize, true)
        } else {
            this.buffer = new BufferService(size, true)
        }
        // register callback
        this.buffer.registerCallbackFlushingBuffer((elements) => {
            // send to server when flushing buffer
            this.postToServer(elements)
        })
    }

    public setClientService(clientService: ClientService): void {
        this.clientService = clientService;
    }


    public static setBufferSize(size: number) {
        BufferedRemoteLogger.maxSize = size
    }

    public static setServerUrl(url: string) {
        BufferedRemoteLogger.serverUrl = url;
    }

    protected logFatal(message?: any, ...optionalParams: any[]) {
        this.buffer.add({
            logLevel: LogLevelEnum.FATAL,
            className: this.getClassName(),
            message: arguments,
            clientId: this.clientService.getClientId(),
            logNumber: this.clientService.nextLogNumber()
        })
    }
    protected logError(message?: any, ...optionalParams: any[]) {
        this.buffer.add({
            logLevel: LogLevelEnum.ERROR,
            className: this.getClassName(),
            message: arguments,
            clientId: this.clientService.getClientId(),
            logNumber: this.clientService.nextLogNumber()
        })
    }
    protected logWarn(message?: any, ...optionalParams: any[]) {
        this.buffer.add({
            logLevel: LogLevelEnum.WARN,
            className: this.getClassName(),
            message: arguments,
            clientId: this.clientService.getClientId(),
            logNumber: this.clientService.nextLogNumber()
        })
    }
    protected logInfo(message?: any, ...optionalParams: any[]) {
        this.buffer.add({
            logLevel: LogLevelEnum.INFO,
            className: this.getClassName(),
            message: arguments,
            clientId: this.clientService.getClientId(),
            logNumber: this.clientService.nextLogNumber()
        })
    }
    protected logDebug(message?: any, ...optionalParams: any[]) {
        this.buffer.add({
            logLevel: LogLevelEnum.DEBUG,
            className: this.getClassName(),
            message: arguments,
            clientId: this.clientService.getClientId(),
            logNumber: this.clientService.nextLogNumber()
        })
    }
    protected logTrace(message?: any, ...optionalParams: any[]) {
        this.buffer.add({
            logLevel: LogLevelEnum.TRACE,
            className: this.getClassName(),
            message: arguments,
            clientId: this.clientService.getClientId(),
            logNumber: this.clientService.nextLogNumber()
        })
    }

    private postToServer(message: IRemoteLoggerMessage): void {
        let r
        if ((<any>window).XMLHttpRequest) {
            r = new XMLHttpRequest();
        } else {
            r = new ActiveXObject("Microsoft.XMLHTTP");
        }
        r.open("POST", BufferedRemoteLogger.serverUrl, true)
        r.setRequestHeader("Content-type", "application/json")
        r.send(JSON.stringify(message))
    }

}
