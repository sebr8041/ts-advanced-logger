import { ILogger } from './i-logger';
import { LogLevelChecker } from "./log-level-checker"
import { BufferedRemoteLogger } from './buffered-remote-logger';
import { IRemoteLoggerMessage } from "./i-remote-logger-message"
import { LogLevelEnum } from "../enum/log-level-enum"
import { ClientService } from "./client-service"

export class RemoteLogger extends BufferedRemoteLogger {

    constructor() {
        super(1)
    }
}
