import {LogLevelEnum} from "../enum/log-level-enum";
import {ILogLevelChecker} from "./i-log-level-checker";


export class LogLevelChecker implements ILogLevelChecker {

    constructor() {
    }

    public isLogEnabled( logLevel : LogLevelEnum, cN : string){
        return true;
    }
}
