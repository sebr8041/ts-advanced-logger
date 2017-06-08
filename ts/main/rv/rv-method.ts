import { IMethodObserver, ObserveMethod } from "../annotation/method-anno"
import { GetLogger } from "../annotation/get-logger"
import { ILogger } from "../service/i-logger"

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
    debug(toLog:string) {
        console.log("will send to log: ", toLog)
    }
    setClassName(className: string): void {
    }


}

class RVMethodObserver implements IMethodObserver {
    @GetLogger(RVLogger)
    private logger: ILogger

    static clientId:string = null
    static logNumber:number = 0
    private arguments:string = ""
    private result:string = ""
    private startTime:number = 0
    private executionTimeMillis = 0
    private methodName:string = ""
    methodNameCalled(methodName:string): void {
        this.methodName = methodName
    }
    
    methodCalled(that, ...args: any[]): void {
        this.arguments = args.join(", ")
        this.startTime = new Date().getTime()
        console.log("method called in RVMethodObserver")
    }

    methodReturns(that, ...args: any[]): void {
        this.executionTimeMillis = new Date().getTime() - this.startTime
        this.result = args.join(", ")
        this.log()
    }

    log(): void {
        RVMethodObserver.logNumber++;
        if(RVMethodObserver.clientId === null) {
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
}

    // TODO find a better strategy to compute a unique client ID
    generateClientId(): string {
        return ""+new Date().getTime()+"_"+Math.floor(Math.random() * 1000) + 1 +"_"+Math.floor(Math.random() * 1000) + 1
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