
import { IRvLogConverter } from "./i-rv-log-converter";
import { IRvLog } from "../i-rv-log";

export class StreamRvLogConverter implements IRvLogConverter {

    /**
     * converts a single RV Log to stream log data in key value format
     * @param log 
     */
    manyToString(log: IRvLog[]): string {
        let result = ""
        log.forEach((ele) => result += this.toString(ele))
        return result;
    }


    getStringContentFormat(): string {
        return "text/plain"
    }

    /**
     * converts a single RV Log to stream log data in key value format
     * @param log 
     */
    toString(log: IRvLog): string {

        let result = "";
        result += log.logNumber + ": timestamp = \"" + log.timestamp + "\" \n"
        result += log.logNumber + ": clientId = \"" + log.clientId + "\" \n"
        result += log.logNumber + ": logNumber = " + log.logNumber + " \n"
        result += log.logNumber + ": executionTimeMS = " + log.executionTimeMS + " \n"

        result += log.logNumber + ": methodName = \"" + log.methodName + "\" \n"
        result += log.logNumber + ": result = \"" + JSON.stringify(log.result) + "\" \n"
        log.arguments.forEach((ele) => console.log("ele", ele))

        for (let i = 0; i < log.arguments.length; i++) {
            result += log.logNumber + ": arguments[" + i + "] = \"" + JSON.stringify(log.arguments[i]) + "\" \n"
        }

        console.log("----------------------------------------------")
        console.log(result)
        console.log("----------------------------------------------")

        return result
    }

    toRvLog(log: string): IRvLog {
        throw new Error("Not implemented")
    }
}
