

import { ILogLevelChecker } from '../service/i-log-level-checker';
import { LogLevelChecker } from '../service/log-level-checker';
import {LogLevelCheckerFactoryException} from "./log-level-checker-factory-exception";


export class LogLevelCheckerFactory {

    private static checker:ILogLevelChecker = null;

    constructor() {

    }

    public static setChecker(checker: ILogLevelChecker) {
        if (this.checker !== null) {
            throw new LogLevelCheckerFactoryException("logChecker can not be set more then once.");
        }
        this.checker = checker;
    }

    public static get(): ILogLevelChecker {
        let myLogLevelChecker = new LogLevelChecker();
        return myLogLevelChecker;
    }

}
