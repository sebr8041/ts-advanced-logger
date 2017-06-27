import { ILogger } from './i-logger';
import { LogLevelChecker } from "./log-level-checker"

export class RemoteLogger implements ILogger {
    setLogLevelChecker(lLC: LogLevelChecker): void {
        throw new Error("Method not implemented.");
    }

    private className: string;

    constructor() {

    }

    public setClassName(cN: string) {
        this.className = cN;
    }

    public error(message?: any, ...optionalParams: any[]) {
    }

    public warn(message?: any, ...optionalParams: any[]) {
    }

    public info(message?: any, ...optionalParams: any[]) {
    }

    public debug(message?: any, ...optionalParams: any[]) {
    }


}
