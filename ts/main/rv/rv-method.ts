import {IMethodObserver, ObserveMethod} from "../annotation/method-anno"
import {GetLogger} from "../annotation/get-logger"
import {ILogger} from "../service/i-logger"
import {RVConfig} from "../config/config"
import * as $ from "jquery";

export class RVLogger implements ILogger {
    error(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }

    warn(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }

    info(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }

    debug(toLog: string) {
        console.log("will send to log: ", toLog)
    }

    setClassName(className: string): void {
    }


}

class RVMethodObserver implements IMethodObserver {
    @GetLogger(RVLogger)
    private logger: ILogger

    static clientId: string = null
    static logNumber: number = 0
    static buffer:any[] = []

    private arguments: string = ""
    private result: string = ""
    private startTime: number = 0
    private executionTimeMillis = 0
    private methodName: string = ""

    methodNameCalled(methodName: string): void {
        this.methodName = methodName
    }

    methodCalled(that, ...args: any[]): void {
        this.arguments = args[0].join(", ")
        this.startTime = new Date().getTime()
    }

    methodReturns(that, ...args: any[]): void {
        this.executionTimeMillis = new Date().getTime() - this.startTime
        this.result = args.join(", ")
        this.log()
    }

    log(): void {
        RVMethodObserver.logNumber++;
        if (RVMethodObserver.clientId === null) {
            RVMethodObserver.clientId = this.generateClientId()
        }
        let date = new Date().toDateString()
        let result = {
            timestamp: date,
            clientId: RVMethodObserver.clientId,
            logNumber: RVMethodObserver.logNumber,
            methodName: this.methodName,
            arguments: this.arguments,
            result: this.result,
            executionTimeMS: this.executionTimeMillis
        }
        this.logger.debug(JSON.stringify(result))
        //RVMethodObserver.buffer.push(JSON.stringify(result))
        RVMethodObserver.buffer.push(result)
        if(RVMethodObserver.buffer.length >= RVConfig.BATCH_SIZE) {
            console.log("send A", JSON.stringify(RVMethodObserver.buffer))
            console.log("send B", RVMethodObserver.buffer)
            this.postToServer(JSON.stringify(RVMethodObserver.buffer))
            RVMethodObserver.buffer = []
        }
    }

    postToServer(message: string): void {
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        let r = new XMLHttpRequest()
        r.open("POST", RVConfig.SERVER_ENDPOINT, true)
        r.setRequestHeader("Content-type", "application/json")
        r.send(message)
    }

    // TODO find a better strategy to compute a unique client ID
    generateClientId(): string {
        let rand1 = Math.floor(Math.random() * 1000) + 1
        let rand2 = Math.floor(Math.random() * 1000) + 1
        return "" + new Date().getTime() + "_" + rand1 + "_" + rand2
    }
}

/*
 @RVMethod({
 withArgs:boolean,
 withResult: boolean,
 setLogger: ILogger,
 clientID: string,
 logNumber: number,
 execTime: number
 })
 */
export function RVMethod() {
    return ObserveMethod(new RVMethodObserver())
}