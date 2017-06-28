import { ILogger } from './i-logger';
import { LogLevelChecker } from "./log-level-checker"
import { LoggerWithChecker } from './logger-with-checker';
import { IRemoteLoggerMessage } from "./i-remote-logger-message"
import { LogLevelEnum } from "../enum/log-level-enum"
import { ClientService } from "./client-service"

export class RemoteLogger extends LoggerWithChecker {

    private static serverUrl: string = null;

    private clientService: ClientService = null;

    public setClientService(clientService: ClientService): void {
        this.clientService = clientService;
    }

    public static setServerUrl(url: string) {
        RemoteLogger.serverUrl = url;
    }

    protected logFatal(message?: any, ...optionalParams: any[]) {
        this.postToServer({
            logLevel: LogLevelEnum.FATAL,
            className: this.getClassName(),
            message: arguments,
            clientId: this.clientService.getClientId(),
            logNumber: this.clientService.nextLogNumber()
        })
    }
    protected logError(message?: any, ...optionalParams: any[]) {
        this.postToServer({
            logLevel: LogLevelEnum.ERROR,
            className: this.getClassName(),
            message: arguments,
            clientId: this.clientService.getClientId(),
            logNumber: this.clientService.nextLogNumber()
        })
    }
    protected logWarn(message?: any, ...optionalParams: any[]) {
        this.postToServer({
            logLevel: LogLevelEnum.WARN,
            className: this.getClassName(),
            message: arguments,
            clientId: this.clientService.getClientId(),
            logNumber: this.clientService.nextLogNumber()
        })
    }
    protected logInfo(message?: any, ...optionalParams: any[]) {
        this.postToServer({
            logLevel: LogLevelEnum.INFO,
            className: this.getClassName(),
            message: arguments,
            clientId: this.clientService.getClientId(),
            logNumber: this.clientService.nextLogNumber()
        })
    }
    protected logDebug(message?: any, ...optionalParams: any[]) {
        this.postToServer({
            logLevel: LogLevelEnum.DEBUG,
            className: this.getClassName(),
            message: arguments,
            clientId: this.clientService.getClientId(),
            logNumber: this.clientService.nextLogNumber()
        })
    }
    protected logTrace(message?: any, ...optionalParams: any[]) {
        this.postToServer({
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
        r.open("POST", RemoteLogger.serverUrl, true)
        r.setRequestHeader("Content-type", "application/json")
        r.send(JSON.stringify(message))
    }

}
