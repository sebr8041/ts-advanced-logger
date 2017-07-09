
import { IRvLogConverter } from "./i-rv-log-converter";
import { IRvLog } from "../i-rv-log";

export class JsonRvLogConverter implements IRvLogConverter {

    /**
     * converts a list of IRvLogs to json
     * @param log 
     */
    manyToString(log: IRvLog[]): string {
        return JSON.stringify(log)
    }

    /**
     * represent format of the string representation
     */
    getStringContentFormat(): string {
        return "application/json"
    }

    /**
     * convert one IRvLog to json
     * @param log 
     */
    toString(log: IRvLog): string {
        return JSON.stringify(log)
    }

    /**
     * convert one json irvlog to IRvLog
     * @param log 
     */
    toRvLog(log: string): IRvLog {
        return JSON.parse(log);
    }
}
