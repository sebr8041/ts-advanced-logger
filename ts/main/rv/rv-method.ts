import { IMethodObserver, ObserveMethod } from "../annotation/observe-method"
import { GetLogger } from "../annotation/get-logger"
import { ILogger } from "../service/i-logger"
import { LogLevelChecker } from "../service/log-level-checker"
import { ConsoleLogger } from "../service/console-logger"
import * as $ from "jquery";
import { ClientService } from "../service/client-service"
import { IEndpoint } from "../rv/endpoint/i-endpoint"
import { EndpointFactory } from "../factory/endpoint-factory"
import { IRvLog } from "./i-rv-log"
import { ClientFactory } from "../factory/client-factory"

class RVMethodObserver implements IMethodObserver {

    @GetLogger(ConsoleLogger)
    private logger: ILogger


    /**
     * temp value to calculate execution time
     */
    private startTime: number = 0

    /**
     * endpoint where the logs get provided
     */
    private endpoint: IEndpoint = null;

    /**
     * service to get information about the client.
     */
    private clientService: ClientService = null;

    /**
     * model to save the log information.
     * this will be send to endpoint.
     */
    private logData: IRvLog = {
        timestamp: null,
        clientId: null,
        logNumber: null,
        methodName: null,
        arguments: null,
        result: null,
        executionTimeMS: null
    };

    /**
     * injection of endpoint and clientService
     * @param endpoint 
     * @param clientService 
     */
    constructor(endpoint: IEndpoint, clientService: ClientService) {
        this.endpoint = endpoint
        this.clientService = clientService
    }

    /**
     * setter for methodName from interface
     */
    methodNameCalled(methodName: string): void {
        this.logData.methodName = methodName
    }

    /**
     * args setter from inteface
     * @param that 
     * @param args 
     */
    methodCalled(that, ...args: any[]): void {
        this.logData.arguments = args[0]
        this.startTime = new Date().getTime()
    }

    /**
     * return setter from interface
     * @param that 
     * @param args 
     */
    methodReturns(that, ...args: any[]): void {
        this.logData.executionTimeMS = new Date().getTime() - this.startTime
        if (args[0]) {
            this.logData.result = args[0]
        }
        // method finished. start logging
        this.log()
    }

    /**
     * execute logging for this record.
     */
    private log(): void {

        // format date 
        this.logData.timestamp = (new Date(this.startTime)).toISOString();

        // set client information. client id and sequence number
        this.logData.clientId = this.clientService.getClientId()
        this.logData.logNumber = this.clientService.nextLogNumber()

        // send information to endpoint
        this.endpoint.provide(this.logData)
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
export function RVMethod<T extends IEndpoint>(endpointClass?: new () => T) {
    let endpointInstance = null;
    if (!endpointClass) {
        // get default
        console.log("RvMethod without endpoint. Using default!")
        endpointInstance = EndpointFactory.getDefaultEndpoint()
    } else {
        // use param endpoint
        endpointInstance = new endpointClass();
    }

    let cF = new ClientFactory()
    let obj = new RVMethodObserver(endpointInstance, cF.getRvInstance())
    //   obj.registerForUnload()
    return ObserveMethod(obj)
}