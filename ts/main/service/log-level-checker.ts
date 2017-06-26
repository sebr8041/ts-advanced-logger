
import { LogLevelEnum, ILogLevelRule } from "../index";

export class LogLevelChecker {

    private static checker: LogLevelChecker = null;

    private rules: ILogLevelRule[] = [];

    private defaultLogLevel: LogLevelEnum = LogLevelEnum.TRACE;

    constructor() {
    }

    public setRules(rules: ILogLevelRule[]) {
        this.rules = rules;
    }

    public getRules(): ILogLevelRule[] {
        return this.rules;
    }

    public setDefaultLogLevel(logLevel: LogLevelEnum) {
        this.defaultLogLevel = logLevel;
    }

    public getDefaultLogLevel(): LogLevelEnum {
        return this.defaultLogLevel;
    }

    public isLogEnabled(className: string, logLevel: LogLevelEnum): boolean {
        return this.firstNotNull(this.rules.filter(rule => rule.className === className).map(s=>s.logLevel)[0], this.defaultLogLevel) <= logLevel

    }

    firstNotNull(...args : any[]): any {
        for(var i = 0; i<args.length; i++){
            if(args[i]) {
                return args[i]
            }
        }
    }

}
