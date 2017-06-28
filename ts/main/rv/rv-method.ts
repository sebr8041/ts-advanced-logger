import { IMethodObserver, ObserveMethod } from "../annotation/observe-method"
import { GetLogger } from "../annotation/get-logger"
import { ILogger } from "../service/i-logger"
import { RVConfig } from "../config/config"
import { LogLevelChecker } from "../service/log-level-checker"
import { ConsoleLogger} from "../service/console-logger"
import * as $ from "jquery";
import { ClientService } from "../service/client-service"

class RVMethodObserver implements IMethodObserver {
    @GetLogger(ConsoleLogger)
    private logger: ILogger

    static clientId: string = null
    static logNumber: number = 0
    static buffer: any[] = []
    static registered: boolean = false

    private arguments: any[] = []
    private result: any = ""
    private startTime: number = 0
    private executionTimeMillis = 0
    private methodName: string = ""

    registerForUnload(): void {
        if (RVMethodObserver.registered) {
            return;
        }
        RVMethodObserver.registered = true
        window.addEventListener("beforeunload", (() => {
            this.logger.debug("flushing buffer...")
            this.flushBuffer()
        }))
    }

    methodNameCalled(methodName: string): void {
        this.methodName = methodName
    }

    methodCalled(that, ...args: any[]): void {
        this.arguments = args[0]
        this.startTime = new Date().getTime()
    }

    methodReturns(that, ...args: any[]): void {
        this.executionTimeMillis = new Date().getTime() - this.startTime
        if (args[0]) {
            this.result = args[0]
        }
        this.log()
    }

    log(): void {
        RVMethodObserver.logNumber++;
        if (RVMethodObserver.clientId === null) {
            RVMethodObserver.clientId = this.generateClientId()
        }
        let d = new Date()
        let date = ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + d.getSeconds() + ":" + d.getMilliseconds() + "" + d.getTimezoneOffset() / 60;

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
        RVMethodObserver.buffer.push(result)
        if (RVMethodObserver.buffer.length >= RVConfig.BATCH_SIZE) {
            console.log("send A", JSON.stringify(RVMethodObserver.buffer))
            console.log("send B", RVMethodObserver.buffer)
            this.flushBuffer()
        }
    }

    flushBuffer(): void {
        this.postToServer(JSON.stringify(RVMethodObserver.buffer))
        RVMethodObserver.buffer = []
    }

    postToServer(message: string): void {
        let r
        if ((<any>window).XMLHttpRequest) {
            r = new XMLHttpRequest();
        } else {
            r = new ActiveXObject("Microsoft.XMLHTTP");
        }
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
    let obj = new RVMethodObserver()
    obj.registerForUnload()
    return ObserveMethod(obj)
}