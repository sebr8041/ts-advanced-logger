import "source-map-support/register";

import { assert } from "chai";
import { suite, test } from "mocha-typescript";
import { LoggerFactory } from "../../main/factory/logger-factory";
import { ILogger } from '../../main/service/i-logger';
import { Logger } from '../../main/service/logger';
import { GetLogger } from "../../main/annotation/get-logger";
import { LoggerFactoryException } from "../../main/factory/logger-factory-exception";
class MyLogger implements ILogger {
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
}

@suite class GetLoggerSuite {
    @test public "Get Instance of ILogger"() {
        class MyClass {
            @GetLogger()
            private logger: ILogger
            constructor() {
            }

            public getLogger(): ILogger {
                return this.logger
            }
        }
        assert.isTrue(new MyClass().getLogger() instanceof Logger)
    }

    @test public "Set Logger twice"() {
        LoggerFactory.setLogger(new MyLogger())

        assert.throws(function () { LoggerFactory.setLogger(new MyLogger()) }, Error)
    }


}
