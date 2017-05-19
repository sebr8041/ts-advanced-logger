import { LogLevelEnum } from "../enum/log-level-enum";
export interface ILogLevelChecker {
    isLogEnabled(logLevel: LogLevelEnum, cN: string): any;
}
