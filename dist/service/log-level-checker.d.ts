import { LogLevelEnum } from "../enum/log-level-enum";
import { ILogLevelChecker } from "./i-log-level-checker";
export declare class LogLevelChecker implements ILogLevelChecker {
    constructor();
    isLogEnabled(logLevel: LogLevelEnum, cN: string): boolean;
}
