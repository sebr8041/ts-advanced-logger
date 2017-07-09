import { IRvLog } from "../i-rv-log";

export interface IRvLogConverter {
    /**
     * converts RVLog to string.
     * when converting fails return value is null
     */
    toString(log: IRvLog): string;

    /**
     * converts list of RVLog to string.
     * when converting fails return value is null
     */
    manyToString(log: IRvLog[]): string;

    /**
     * converts string to rv log.
     * when converting fails return value is null
     */
    toRvLog(log: string): IRvLog;

    /**
     * http content-type of the string representation. 
     * for example: application/json
     */
    getStringContentFormat(): string;
}