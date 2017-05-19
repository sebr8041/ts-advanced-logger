import { ILogger } from '../service/i-logger';
export declare class LoggerFactory {
    private static logger;
    constructor();
    static setLogger(logger: ILogger): void;
    static get(cN: string): ILogger;
}
