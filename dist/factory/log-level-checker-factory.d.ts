import { ILogLevelChecker } from '../service/i-log-level-checker';
export declare class LogLevelCheckerFactory {
    private static checker;
    constructor();
    static setChecker(checker: ILogLevelChecker): void;
    static get(): ILogLevelChecker;
}
