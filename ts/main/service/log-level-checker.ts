import { LoggerConfig } from "../config/config"
import { ILogLevelRule } from "./i-log-level-rule";
import { LogLevelEnum } from "../enum/log-level-enum";
/**
 * can give information about which class should be logged on which level.
 */
export class LogLevelChecker {

    private static instance: LogLevelChecker = null;

    /**
     * Rules
     */
    private rules: ILogLevelRule[] = [];

    /**
     * Global default log level.
     */
    private defaultLogLevel: LogLevelEnum = LogLevelEnum.TRACE;

    private constructor() {
        this.setRules(LoggerConfig.getLoggerConfig().rules)
    }

    public static get(): LogLevelChecker {
        if (LogLevelChecker.instance === null) {
            LogLevelChecker.instance = new LogLevelChecker();
        }
        return LogLevelChecker.instance;
    }

    /**
     * set the specific rules.
     * @param rules 
     */
    public setRules(rules: ILogLevelRule[]) {
        this.rules = rules;
    }

    /**
     * returns the specific rules
     */
    public getRules(): ILogLevelRule[] {
        return this.rules;
    }

    /**
     * sets the global default log level. (will be overiten by specific rules)
     * @param logLevel 
     */
    public setDefaultLogLevel(logLevel: LogLevelEnum) {
        this.defaultLogLevel = logLevel;
    }

    /**
     * returns the global default log level. (will be overiten by specific rules)
     */
    public getDefaultLogLevel(): LogLevelEnum {
        return this.defaultLogLevel;
    }

    /**
     * checks if a logger should log on a specific log level for an class.
     * @param className 
     * @param logLevel 
     */
    public isLogEnabled(className: string, logLevel: LogLevelEnum): boolean {
        return this.firstNotNull(this.rules.filter(rule => rule.className === className).map(s => s.logLevel)[0], this.defaultLogLevel) <= logLevel

    }

    /**
     * returns the first not null & not undefined value
     * @param args 
     */
    private firstNotNull(...args: any[]): any {
        for (var i = 0; i < args.length; i++) {
            if (args[i]) {
                return args[i]
            }
        }
        return null
    }

}
