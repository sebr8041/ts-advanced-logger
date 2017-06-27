import "source-map-support/register";

import { assert } from "chai";
import { suite, test } from "mocha-typescript";
import { LoggerFactory } from "../../main/factory/logger-factory";
import { ILogger } from '../../main/service/i-logger';
import { Logger } from '../../main/service/logger';
import { GetLogger } from "../../main/annotation/get-logger";
import { LoggerFactoryException } from "../../main/factory/logger-factory-exception";
import { ObserveMethod } from "../../main/annotation/observe-method";
import { RVMethod, RVLogger } from "../../main/rv/rv-method";
import { LogLevelChecker } from "../../main/index"

class MyLogger implements ILogger {
    trace(message?: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    fatal(message?: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    setLogLevelChecker(lLC: LogLevelChecker): void {
      
    }
    public a: number
    public b: number

    setClassName(className: string): void {
    }

    error(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    warn(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    info(a: number) {
        this.a = a
    }
    debug(a: number[]) {
        this.a = a[0];
        this.b = a[1];
    }
    
}

class MyClass {
    @GetLogger(MyLogger)
    private logger: MyLogger
    private that: MyClass = this;
    constructor() {
    }

    public getLogger(): MyLogger {
        return this.logger
    }

    @ObserveMethod({
        methodCalled: (that: MyClass, a: number[]) => {
            that.logger.debug(a)
        }
    })
    public sumUp(a: number, b: number): number {
        return a + b;
    }
}

class MyClassForReturn {
    @GetLogger(MyLogger)
    private logger: MyLogger
    constructor() {
    }

    public getLogger(): MyLogger {
        return this.logger
    }

    @ObserveMethod({
        methodReturns: (that: MyClassForReturn, result: number) => {
            that.logger.info(result)
        }
    })
    public sumUp(a: number, b: number): number {
        return a + b;
    }
}

class MyClassForRV {
    private a:number = 1337
    
    constructor() {
    }

    @RVMethod()
    public sumUp(a: number, b: number): number {
        return a + b;
    }

    @RVMethod()
    public doVoidStuff(): void {

    }

    @RVMethod()
    public takeObj(obj: MyClassForRV): MyClassForRV {
        return obj
    }
}

@suite class IT1Suite {
    @test public "Method called"() {
        let myClass = new MyClass()

        let result = myClass.sumUp(3, 7)
        assert.equal(3, myClass.getLogger().a)
        assert.equal(7, myClass.getLogger().b)

        assert.equal(10, result)
        assert.isTrue(myClass.getLogger() instanceof MyLogger)
    }

    @test public "Method returns"() {
        let myClass = new MyClassForReturn()

        let result = myClass.sumUp(3, 7)

        assert.equal(10, myClass.getLogger().a)
        assert.equal(10, result)
        assert.isTrue(myClass.getLogger() instanceof MyLogger)
    }

    @test public "Method called RVMethod"() {
        let myClass = new MyClassForRV()

        let result = myClass.sumUp(3, 7)

        assert.equal(10, result)
    }

    @test public "Method called using batch"() {
        let myClass = new MyClassForRV()

        let result = myClass.sumUp(1, 2)
        myClass.sumUp(3, 4)
        myClass.sumUp(5, 6)


        assert.equal(3, result)
    }

    @test public "Method called RVMethod void"() {
        let myClass = new MyClassForRV()

        myClass.doVoidStuff()
    }

    @test public "Method called RVMethod takeObject"() {
        let myClass = new MyClassForRV()

        myClass.takeObj(myClass)
        myClass.takeObj(myClass)
        myClass.takeObj(myClass)

    }


}
