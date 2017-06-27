import "source-map-support/register";

import { assert } from "chai";
import { suite, test } from "mocha-typescript";
import { LoggerFactory } from "../../main/factory/logger-factory";
import { ILogger } from '../../main/service/i-logger';
import { GetLogger } from "../../main/annotation/get-logger";
import { LoggerFactoryException } from "../../main/factory/logger-factory-exception";
import { LogLevelChecker } from "../../main/index"

class MyLogger implements ILogger {
    trace(message?: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    fatal(message?: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    setClassName(className: string): void {
        //throw new Error('Method not implemented.');
    }

    error(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    warn(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    info(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    debug(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    setLogLevelChecker(lLC: LogLevelChecker): void {
    }
}


class MyDefaultLogger implements ILogger {
    trace(message?: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    fatal(message?: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    setClassName(className: string): void {
        //throw new Error('Method not implemented.');
    }

    error(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    warn(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    info(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    debug(message?: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    setLogLevelChecker(lLC: LogLevelChecker): void {
    }
}

@suite class GetLoggerSuite {
    @test public "Get Instance of ILogger"() {
        class MyClass {
            @GetLogger(MyLogger)
            private logger: ILogger
            constructor() {
            }

            public getLogger(): ILogger {
                return this.logger
            }
        }
        assert.isTrue(new MyClass().getLogger() instanceof MyLogger)
    }

    @test public "Using Default-Logger"() {
        LoggerFactory.setDefaultLogger(MyDefaultLogger)

        class MyClass {
            @GetLogger()
            private logger: ILogger
            constructor() {
            }

            public getLogger(): ILogger {
                return this.logger
            }
        }
        assert.isTrue(new MyClass().getLogger() instanceof MyDefaultLogger)
    }


}
